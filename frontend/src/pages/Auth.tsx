import { gql, useMutation } from "@apollo/client";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/router";

const Auth = () => {
  const AUTH_USER = gql`
    mutation AuthUser($login: String!, $password: String!, $isSigned: Boolean!) {
      authUser(login: $login, password: $password, isSigned: $isSigned) {
        accessToken
      }
    }
  `;

  const router = useRouter();

  const [authUser, { loading, error }] = useMutation(AUTH_USER, {
    onCompleted: (queryData) => {
      if (queryData) {
        localStorage.setItem('access_token', JSON.stringify(queryData.authUser.accessToken));
        router.push('/')
      }
    },
    errorPolicy: "all",
  });

  const handleSubmit = (login: String, password: String, isSigned: Boolean) => {
    authUser({ variables: { login, password, isSigned } });
  };

  return (
    <AuthForm error={error} handleSubmit={handleSubmit} />
  )
};

export default Auth;
