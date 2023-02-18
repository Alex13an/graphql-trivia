import Auth from "@/components/Auth";
import Preloader from "@/components/Preloader";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Trivia Game</title>
        <meta name="description" content="SIGame like trivia game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth />
    </>
  );
}
