import { NextPage, GetServerSideProps } from "next";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Inscription: NextPage<void> = () => {
  return (
    <div className="page-inscription">
      <br />
      <h1 className="titre-page-inscription text-center">Register</h1>
      <p className="sous-titre-page-inscription text-center">Welcome [user.name], please fill in this informations.</p>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-6">
              <label htmlFor="exampleInputUserName" className="form-label">
                UserName :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="UserName"
              />

              <label htmlFor="inputPassword" className="form-label">
                Password :
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
              />

              <label htmlFor="inputPassword" className="form-label">
                Confirm Password :
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Confirm Password"
              />

              <label htmlFor="exampleInputBirthDate" className="form-label">
                Birthdate
              </label>
              <input
                type="Date"
                className="form-control"
                id="exampleInputBirthDate"
                aria-describedby="emailHelp"
                placeholder="BirthDate"
              />
            </div>
            <div className="col-6">
              <h3 className="titre-interests text-center">
                Interests (minimum 3)
              </h3>
              <div className="container">
                <div className="row row-cols-3">
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                  <div className="imageInterest col text-center">
                    <img
                      className="imageCircle"
                      src="https://images-na.ssl-images-amazon.com/images/I/5110WjkmmAL._AC_SX425_.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="Boutton btn">
                create
              </button>
            </div>
          </div>
        </form>
        <style jsx>{`
          .form-check-input {
            background-color: #fbe23b;
            color: black;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Inscription;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
