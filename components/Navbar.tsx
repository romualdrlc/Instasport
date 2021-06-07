import React from "react";
import { GetServerSideProps } from "next";
import initClient from "../utils/initClient";
//import { getUserByCookie } from "../utils/initDatabase";
import cookies from "next-cookies";
//import { useRouter } from "next/router";

//const Navar: React.FC = (props: any) => {
  const Navar: React.FC = () => {
  return (
    <>
<div className="Nav">
<nav className="row">
  <div className="itemNavbar col-3">
    <img className="logoNav" src="../logocarre.png" />
  </div>
  <div className="itemNavbar col-6">
    <div className="SearchBar d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  </div>
  <div className="itemNavbar col-3">
    <img
      className="photoNav"
      //key={props.user.id ? props.user.id : ""}
      //src={props.user.Cover ? props.user.Cover : "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"}
      src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
      alt=""
    />
    {/* {(props.user && props.user.id) ? <a href="/">Logout</a> : <a href={props.url}>Login</a> }
    <p>{(props.user && props.user.userName) ? props.user.userName : ""}</p> */}
  </div>
</nav>
</div>
</>)}

export default Navar;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  const c = cookies(context).fewlines;
  let currentUser;
// if (c) {
//   currentUser = await getUserByCookie(c);}
  
  console.log("🟢",currentUser);
  const urlToSignIn = await initClient().getAuthorizationURL();
  //if (!currentUser) response.redirect(JSON.parse(JSON.stringify(urlToSignIn));
  //getUserByCookie
  return {
    props: {
      // url: JSON.parse(JSON.stringify(urlToSignIn)),
      // user : c ? currentUser : null
    },
  };
};