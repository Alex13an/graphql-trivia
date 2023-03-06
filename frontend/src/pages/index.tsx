import MainMenu from "@/components/MainMenu";
import Preloader from "@/components/Preloader";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";

// TODO: Middleware for access token on backend, interceptors for refresh token on frontend

export default function Home() {
  const router = useRouter();

  const REFRESH_USER = gql`
    query {
      refreshUser {
        accessToken
      }
    }
  `;

  const { loading, error, data } = useQuery(REFRESH_USER, {
    context: {
      uri: "http://localhost:4000/refresh/",
    },
    onCompleted: (queryData) => {
      if (queryData) {
        localStorage.setItem("access_token", queryData.refreshUser.accessToken);
        return;
      }
      router.push("/Auth");
    },
    onError: () => {
      router.push("/Auth");
    },
    errorPolicy: "all",
  });

  return (
    <>
      <Head>
        <title>Trivia Game</title>
        <meta name="description" content="SIGame like trivia game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading || error ? <Preloader /> : <MainMenu />}
    </>
  );
}
