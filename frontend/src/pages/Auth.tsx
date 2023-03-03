import { ChangeEvent, FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import AuthForm from "@/components/AuthForm";

// TODO: MAKE ONE SINGLE MUTATION INSTEAD OF TWO SEPARATE
const Auth = () => {
  const AUTH_USER = gql`
    mutation SignUp($login: String!, $password: String!, $isSigned: Boolean!) {
      signUp(login: $login, password: $password, isSigned: $isSigned) {
        accessToken
        refreshToken
      }
    }
  `;

  const [authUser, { data, loading, error }] = useMutation(AUTH_USER, {
    onCompleted: (queryData) => {
      console.log(queryData);
    },
    errorPolicy: "all",
  });

  const handleSubmit = (login: String, password: String, isSigned: Boolean) => {
    console.log(login, password);
    authUser({ variables: { login, password, isSigned } });
  };

  return (
    <AuthForm error={error} handleSubmit={handleSubmit} />
  )
};

export default Auth;
