import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getUserByCookie,
  getAllGroups,
  getAllPostsByGroups,
} from "../utils/initDatabase";

const Home: NextPage = (props: any) => {
  ////////////////////////////////////
  ////// useState, useEffect /////////
  ///////////////////////////////////

  const [listUsers, setListUsers] = useState([]);
  const [listMyGroups, setListMyGroups] = useState([]);
  const [listOtherGroups, setListOtherGroups] = useState([]);
  const [selectSport, setSelectSport] = useState("");
  const [postFind, setPostFind] = useState<any>([]);
  const tabValueInitial = listMyGroups.filter((group, index) => {
    if (group[index]) {
      return index;
    }
  });

  const [sportsArray, setSportsArray] = useState(tabValueInitial);

  const OnClickSport = (idOfSport: number) => {
    const oneElemeArray = [idOfSport];
    setSportsArray(oneElemeArray);
  } 

  useEffect(() => {
    setListOtherGroups(props.currentUserOtherGroupsArray);
    setListMyGroups(props.currentUserGroupsArray);

    const defaultUsers: any = async () => {
      await fetch("/api/defaultUsers").then((res) =>
        res.json().then((result) => setListUsers(result))
      );
    };
    const searchPosts: any = async (groupId: number) => {
      await fetch("/api/findpostsbygroup?groupId=" + groupId).then((res) =>
        res.json().then((result) => setSelectSport(result))
      );
    };
    console.log("posts recupere **************", postFind);
    defaultUsers();
    console.log("$$$$$$$$$$$$$$", props.currentUserGroupsArray);
    const findPosts: any = async (groupId: any) => {
      const posts = await searchPosts(groupId);
      // const recup = postFind.concat(posts);
      // return recup;
      return posts
    };
    sportsArray.forEach((idOfSport) => {
      
      // setPostFind(postFind.concat(findPosts(idOfSport)));
      // setPostFind(postFind.concat(JSON.parse(
      //   JSON.stringify(findPosts(idOfSport)))));
      setPostFind(JSON.parse(
        JSON.stringify(postFind.concat(findPosts(idOfSport)))));
      
  })}, [sportsArray]);

  // sportsArray.map((value) => setPostFind(value));

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
                        <button
                          onClick={() => OnClickSport(group.id)}
                          key={"bouton" + index}
                        >
                          test
                        </button>
                        <div className="card-body">
                          <div className="card-title" key={"title" + index}>
                            {group.UserName}
                          </div>
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
                          key={"image2" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                        />
                        <div className="card-body">
                          <div className="card-title" key={"title2" + index}>
                            {group.UserName}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="BodyNews col-5">
              <div className="card mb-3" style={{ width: 600 }}>
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src="https://images.unsplash.com/photo-1552318965-6e6be7484ada?ixlib=rb-1.2.1&ixid=MnwxMjA3[…]G90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80"
                      alt="..."
                      style={{ width: 260, height: 360 }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body" style={{ textAlign: "left" }}>
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                      <p className="card-text">
                        <small className="text-muted">Comments</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
