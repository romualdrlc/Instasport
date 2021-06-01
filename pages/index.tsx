
//recupt access token de FL
//l'inserer dans header cookie
//afficher (griser le bon lien) sur toutes les pages

//import Layout from "../components/layout";
import React from "react";
import { GetServerSideProps } from "next";

//require('dotenv').config();

import OAuth2Client, {
  OAuth2ClientConstructor,
} from "@fewlines/connect-client";

const SignInWithFewLines: React.FC = (props: any) => {
  return (
    // <Layout>
      <a href={props.url}>
        <h3>Login with FL</h3>
      </a>
    // </Layout>
  );
};

export default SignInWithFewLines;

export const getServerSideProps: GetServerSideProps = async () => {
  const oauthClientConstructorProps: OAuth2ClientConstructor = {
    openIDConfigurationURL:
      "https://fewlines.connect.prod.fewlines.tech/.well-known/openid-configuration",
    clientID: process.env.CONNECT_CLIENT_ID,
    clientSecret: process.env.CONNECT_CLIENT_SECRET,
    redirectURI: process.env.CONNECT_REDIRECT_URI + "/oauth/callback",
    audience: "wdb2g1",
    scopes: ["openid", "email"],
  };

  const otClient = new OAuth2Client(oauthClientConstructorProps);

  const urlToSignIn = await otClient.getAuthorizationURL();

  return {
    props: { url: JSON.parse(JSON.stringify(urlToSignIn)) },
  };
};
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>lkhbjom</Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

