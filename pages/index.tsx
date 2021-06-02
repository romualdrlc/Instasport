//recupt access token de FL
//l'inserer dans header cookie
//afficher (griser le bon lien) sur toutes les pages

//import Layout from "../components/layout";
import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

//require('dotenv').config();

import OAuth2Client, {
  OAuth2ClientConstructor,
} from "@fewlines/connect-client";

const SignInWithFewLines: React.FC = (props: any) => {
  return (
    // <Layout>
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="/logo.png" type="images/x-icon" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="container">
        <div className="text-center">
          <img className="logo" src="logocarre.png" />
        </div>
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <button type="button" className="btn btn-warning">
                <a href={props.url}>Login Fewlines</a>
              </button>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<a href="#">Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    /* </Layout> */
  );
};

export default SignInWithFewLines;

export const getServerSideProps: GetServerSideProps = async () => {
  const oauthClientConstructorProps: OAuth2ClientConstructor = {
    openIDConfigurationURL:
      "https://fewlines.connect.prod.fewlines.tech/.well-known/openid-configuration",
    clientID: process.env.CONNECT_CLIENT_ID,
    clientSecret: process.env.CONNECT_CLIENT_SECRET,
    redirectURI: process.env.CONNECT_REDIRECT_URI,
    audience: "wdb2g1",
    scopes: ["openid", "email"],
  };

  const otClient = new OAuth2Client(oauthClientConstructorProps);

  const urlToSignIn = await otClient.getAuthorizationURL();

  return {
    props: { url: JSON.parse(JSON.stringify(urlToSignIn)) },
  };
};
