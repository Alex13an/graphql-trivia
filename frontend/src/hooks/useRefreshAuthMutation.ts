import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { DocumentNode } from "graphql";

const REFRESH_USER = gql`
  query {
    refreshUser {
      accessToken
    }
  }
`;

const useRefreshAuthMutation = (
  schema: DocumentNode,
  onCompleted?: ((data: any) => void) | undefined
) => {
  const [refreshTokens] = useLazyQuery(REFRESH_USER, {
    context: {
      uri: "http://localhost:4000/refresh/",
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });

  const [setData, { loading, error, data }] = useMutation(schema, {
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onError: async ({ networkError }, options) => {
      const code = networkError?.result?.errors[0]?.extensions?.code;
      if (code === "UNAUTHENTICATED") {
        const { data: token } = await refreshTokens();
        if (!token?.refreshUser) {
          return;
        }
        localStorage.setItem("access_token", token.refreshUser.accessToken);
        await setData(options?.variables);
      }
    },
    onCompleted,
  });

  return {
    setData,
    loading,
    error,
    data,
  };
};

export default useRefreshAuthMutation;
