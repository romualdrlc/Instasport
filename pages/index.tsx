
import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import initClient from "../utils/initClient";



const SignInWithFewLines: React.FC = (props: any) => {
  return (
    <Layout>
      <>
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
    </Layout>
  );
};

export default SignInWithFewLines;

export const getServerSideProps: GetServerSideProps = async () => {

  const urlToSignIn = await initClient().getAuthorizationURL();

  return {
    props: {
      url: JSON.parse(JSON.stringify(urlToSignIn)),
    },
  };
};
