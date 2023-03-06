import { useLazyQuery, gql } from "@apollo/client";
import { DocumentNode } from "graphql";

const REFRESH_USER = gql`
  query {
    refreshUser {
      accessToken
    }
  }
`;

const useLazyRefreshAuthQuery = (schema: DocumentNode, onCompleted?: ((data: any) => void) | undefined) => {
  const [ refreshTokens ] = useLazyQuery(REFRESH_USER, {
    context: {
      uri: "http://localhost:4000/refresh/",
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  })

  const [getData, { loading, error, data, refetch }] = useLazyQuery(schema, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    onError: async ({ networkError }) => {
      const code = networkError?.result?.errors[0]?.extensions?.code;
      if (code === 'UNAUTHENTICATED') {
        const { data: token } = await refreshTokens();
        if (!token?.refreshUser) {
          return;
        }
        localStorage.setItem('access_token', token.refreshUser.accessToken);
        console.log(token);
        await refetch();
      }
    },
    onCompleted,
  })

  return {
    getData,
    loading,
    error,
    data,
  }
}

export default useLazyRefreshAuthQuery;
