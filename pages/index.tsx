import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import initClient from "../utils/initClient";

const SignInWithFewLines: React.FC = (props: any) => {
  ///////////////////////////
  ////// Affichage /////////
  //////////////////////////
  return (
    <Layout>
      <>
        <h1>WELCOME</h1>
        <div className="CardFullLogin text-center">
          <div className="text-center">
            <img className="logo" src="logocarre.png" />
          </div>
          <h4 style={{ color: "#FBE23B" }}>Login with :</h4>
          <br />
          <button type="button" className="btn btn-warning">
            <a style={{ color: "black" }} href={props.url}>
              Fewlines
            </a>
          </button>
        </div>
      </>
    </Layout>
  );
};

export default SignInWithFewLines;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async () => {
  const urlToSignIn = await initClient().getAuthorizationURL();

  return {
    props: {
      url: JSON.parse(JSON.stringify(urlToSignIn)),
    },
  };
};
