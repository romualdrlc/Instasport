import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUserByCookie, getAllGroups } from "../utils/initDatabase";
import Link from "next/link";
import { userInfo } from "os";

const Home: NextPage = (props: any) => {
  ////////////////////////////////////
  ////// useState, useEffect /////////
  ///////////////////////////////////
  const [listUsers, setListUsers] = useState([]);
  const [listMyGroups, setListMyGroups] = useState([]);
  const [listOtherGroups, setListOtherGroups] = useState([]);

  useEffect(() => {
    setListOtherGroups(props.currentUserOtherGroupsArray);
    setListMyGroups(props.currentUserGroupsArray);
    const defaultUsers: any = async () => {
      await fetch("/api/defaultUsers").then((res) =>
        res.json().then((result) => setListUsers(result))
      );
    };

    defaultUsers();
    console.log("$$$$$$$$$$$$$$", props.currentUserGroupsArray);
  }, []);
  ///////////////////////////
  ////// Affichage /////////
  //////////////////////////
  return (
    <Layout>
      <div>
        <div className="BodyNews">
          <div className="container">
            <div className="row"></div>
          </div>
          <div className="row">
            <div className="BodyNews col-3">
              <div className="container">
                <h3>My sports</h3>
                {listMyGroups.map((group, index) => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <div className="card" style={{ width: 280, height: 250 }}>
                        <img
                          key={"image" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                        />
                        <div className="card-body" key={"sportName" + index}>
                          <p className="card-title">{group.UserName}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <br></br>
                <h3>Other sports</h3>
                <br></br>
                {listOtherGroups.map((group, index) => {
                  return (
                    <div>
                      <div className="card" style={{ width: 280, height: 250 }}>
                        <img
                          key={"image" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                        />
                        <div className="card-body" key={"sportName" + index}>
                          <p className="card-title">{group.UserName}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="BodyNews col-5"></div>
            <div className="BodyNews col-4">
              <div className="container">
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="">
                        <div className="comment mt-4 text-justify float-left">
                          <img
                            src="https://i.imgur.com/yTFUilP.jpg"
                            alt=""
                            className="rounded-circle"
                            width={40}
                            height={40}
                            key="img1"
                          />
                          <h4>Jhon Doe</h4> <span>- 20 October, 2018</span>
                          <br />
                          <p>
                            <h1>toto</h1>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus numquam assumenda hic aliquam vero
                            sequi velit molestias doloremque molestiae dicta?
                          </p>
                        </div>
                        <div className="text-justify darker mt-4 float-right">
                          <img
                            src="https://i.imgur.com/CFpa3nK.jpg"
                            alt=""
                            className="rounded-circle"
                            width={40}
                            height={40}
                            key="img2"
                          />
                          <h4>Rob Simpson</h4> <span>- 20 October, 2018</span>
                          <br />
                          <p>
                            <h1>toto</h1>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus numquam assumenda hic aliquam vero
                            sequi velit molestias doloremque molestiae dicta?
                          </p>
                        </div>
                        <div className="comment mt-4 text-justify">
                          <img
                            src="https://i.imgur.com/yTFUilP.jpg"
                            alt=""
                            className="rounded-circle"
                            width={40}
                            height={40}
                            key="img3"
                          />
                          <h4>Jhon Doe</h4> <span>- 20 October, 2018</span>
                          <br />
                          <p>
                            <h1>toto</h1>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus numquam assumenda hic aliquam vero
                            sequi velit molestias doloremque molestiae dicta?
                          </p>
                        </div>
                        <div className="darker mt-4 text-justify">
                          <img
                            src="https://i.imgur.com/CFpa3nK.jpg"
                            alt=""
                            className="rounded-circle"
                            width={40}
                            height={40}
                            key="img4"
                          />
                          <h4>Rob Simpson</h4> <span>- 20 October, 2018</span>
                          <br />
                          <p>
                            <h1>toto</h1>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus numquam assumenda hic aliquam vero
                            sequi velit molestias doloremque molestiae dicta?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentUsersName = "";
  let currentUsersCover = "";
  let currentUserGroups = "";
  let currentUserGroupsArray = [];
  let currentUserOtherGroupsArray = [];
  let allGroups = [];

  const c = context.req.cookies.fewlines;
  if (c) {
    const currentUser = await getUserByCookie(c);
    allGroups = await getAllGroups();
    console.log("ICIIIIIIIIII !!!!!!", allGroups);
    currentUserGroups = currentUser.Groups;
    currentUsersName = currentUser.userName;
    currentUsersCover = currentUser.Cover ? currentUser.Cover : "";
    currentUserGroupsArray = allGroups.filter((group, index) => {
      if (currentUserGroups[index]) return group;
    });
    currentUserOtherGroupsArray = allGroups.filter((group, index) => {
      if (!currentUserGroups[index]) return group;
    });
  }

  return {
    props: {
      currentUsersName: currentUsersName
        ? JSON.parse(JSON.stringify(currentUsersName))
        : "",
      currentUsersCover: currentUsersCover,
      //currentUserGroupsArray: allGroups,
      // currentUserGroupsArray: JSON.parse(JSON.stringify(allGroups)),
      // currentUserGroups: currentUserGroups,
      currentUserGroupsArray: JSON.parse(
        JSON.stringify(currentUserGroupsArray)
      ),

      currentUserOtherGroupsArray: JSON.parse(
        JSON.stringify(currentUserOtherGroupsArray)
      ),
    },
  };
};
