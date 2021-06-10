import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getUserByCookie,
  getAllGroups,
  getAllPostsByGroups,
} from "../utils/initDatabase";

const Home: NextPage = (props: any) => {
  type Post = {
    id: number;
    userId: number;
    datePost: string;
    photosPost: string;
    textPost: string;
    likePost: number[];
    commentsPost: string[];
    groupId: number;
    postTitle: string;
  };

  ////////////////////////////////////
  ////// useState, useEffect /////////
  ///////////////////////////////////

  const [listUsers, setListUsers] = useState([]);
  const [listMyGroups, setListMyGroups] = useState([]);
  const [listOtherGroups, setListOtherGroups] = useState([]);
  const [selectSport, setSelectSport] = useState("");
  //const [resultGlobal, setResultGlobal] = useState([]);


  const tempPost: Post[] = [
    {
      id: 1,
      userId: 2,
      datePost: "1 / 1 / 2001",
      photosPost:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixid=MnwxMjA3fDB8MHxwaG90by1[…]fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
      textPost:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      likePost: [1],
      commentsPost: ["1"],
      groupId: 0,
      postTitle: "postTitle",
    },
  ];
  //const [postFind, setPostFind] = useState<Post[]>(tempPost);
  const [postFind, setPostFind] = useState<any>();

  //Afficher les posts des groupes de l'utilisateur
  // const tabValueInitial = listMyGroups.filter((group, index) => {
  //   if (group[index]) {
  //     return index;
  //   }
  // });
  const arrayOfGroupIds = listMyGroups.map((group) => group.id)
  const [sportsArray, setSportsArray] = useState([0,1,2,3,4,5,6,7,8]);

  const OnClickSport = (idOfSport: number) => {
    const oneElemeArray = [idOfSport];
    setSportsArray(oneElemeArray);
  };
  
  const OnClickMySports = () => {
    console.log("--------------------",arrayOfGroupIds)
    setSportsArray(arrayOfGroupIds);
  };


  useEffect(() => {


    
    setListOtherGroups(props.currentUserOtherGroupsArray);
    setListMyGroups(props.currentUserGroupsArray);

    const defaultUsers: any = async () => {
      await fetch("/api/defaultUsers").then((res) =>
        res.json().then((result) => setListUsers(result))
      );
    };
    const searchPosts: any = async (groupIds: number[]) => {
      let resultGlobal=[];
      groupIds.forEach((groupId) => {
        fetch("/api/findpostsbygroup?groupId=" + groupId).then((res) => {
        res.json().then((result) => {
          console.log("result du fetch$$$$$$$$$$$$$$$$$$$$", result);

for(let i=0;i<result.length;i++) {
  resultGlobal.push(result[i]);
}
 console.log("🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣",resultGlobal);
 setPostFind(resultGlobal);

          console.log(
            "result du fetch JSON",
            JSON.parse(JSON.stringify(result.length))
          );
          const resultFinal = result.map((post) => {
            const postLighten = {
              id: post.id,
              userId: post.userId,
              datePost: post.datePost,
              photosPost: post.photosPost,
              textPost: post.textPost,
              likePost: post.likePost,
              commentsPost: post.commentsPost,
              groupId: post.groupId,
              postTitle: post.postTitle,
            };
            return postLighten;
          });
          console.log("*********************************", resultFinal);
          return resultFinal;
        })}
      );})
    };

    console.log("posts recupere **************", postFind);
    defaultUsers();
    searchPosts(sportsArray);

  }, [sportsArray]);

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
                <h3 onClick={() => OnClickMySports()}>My sports</h3>
                {listMyGroups.map((group, index) => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <div className="card" style={{ width: 280, height: 280 }}>
                        <img
                          key={"image" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                          onClick={() => OnClickSport(group.id)}

                        />
          
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
                      <div className="card" style={{ width: 280, height: 280 }}>
                        <img
                          key={"image2" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                          onClick={() => OnClickSport(group.id)}
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
              {postFind
                ? postFind.map((post, index) => {
                    return (
                      <div className="card mb-3" style={{ width: 600 }}>
                        <div className="row g-0">
                          <div className="col-md-6">
                            <img
                              src={post.photosPost}
                              key={"postImage" + index}
                              alt="..."
                              style={{ width: 260, height: 360 }}
                            />
                          </div>
                          <div className="col-md-6">
                            <div
                              className="card-body"
                              style={{ textAlign: "left" }}
                            >
                              <h5 className="card-title">{post.postTitle}</h5>
                              <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                              </p>
                              <p className="card-text">
                                <small className="text-muted">Comments</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
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
      if (currentUserGroups && [index]) return group;
    });
    currentUserOtherGroupsArray = allGroups.filter((group, index) => {
      if (currentUserGroups && !currentUserGroups[index]) return group;
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
