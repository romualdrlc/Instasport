import { NextPage, GetServerSideProps } from "next";
import initClient from "../utils/initClient";
import React, { useEffect, useState } from "react";
//import { getUserByCookie } from "../utils/initDatabase";
import cookies from "next-cookies";
//import { useRouter } from "next/router";

//const Navar: React.FC = (props: any) => {

import cookie from "js-cookie";

const Navar: NextPage = (props: any) => {
  const [searchText, setSearchText] = useState("");

  const searchInDB = async () => {
    await fetch("/api/search?searchValue=" + searchText);
  };

  function handleChange(event) {
    setSearchText(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  const cookieFromSession = cookie.get("fewlines");
  

  const logoutUser= async () => {
    cookie.remove("fewlines", { path: "/" });
    await fetch("/api/logout?usersToken=" + cookieFromSession);
  };

  // const isLogged: any = async (cookie: string) => {
  //   await fetch("/api/islogged").then((res) => res.json());
  // };
  // isLogged(props.cookie);
  return (
    <>
      <div className="Nav">
        <nav className="row">
          <div className="itemNavbar col-3">
            <img className="logoNav" src="../logocarre.png" />
          </div>
          <div className="itemNavbar col-6">
            <div className="SearchBar d-flex" onSubmit={(e) => handleSubmit(e)}>
              <input
                onChange={handleChange}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-warning"
                type="submit"
                onClick={() => searchInDB()}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="itemNavbar col-3">
            <div className="row">
              {/* <p>{cookieFromSession ? userName : ""}</p> */}
            </div>
            <div className="row">
              <img
                className="photoNav"
                // key={props.currentUsersName ? props.currentUsersName : ""}
                // src={
                //   props.currentUsersCover
                //     ? props.currentUsersCover
                //     : "https://smashicons.com/uploads/media/icon_thumbnail/0007/26/thumb_625671_icon_thumbnail_small.png"
                // }
                src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
                alt=""
              />
            </div>
            <div className="row">
              {cookieFromSession ? (
                <button onClick={() => logoutUser()}><a href="/">Logout</a></button>
              ) : (
                <a href="/">Login</a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navar;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("juste context", context);
  // const c = cookies(context).fewlines;
  // let currentUser;

  // console.log("🟢", currentUser);
  // console.log("cookie", c);
  // const urlToSignIn = await initClient().getAuthorizationURL();

  return {
    props: {
      // cookie: c,
      context: context,
    },
  };
};
