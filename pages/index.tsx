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
