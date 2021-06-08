import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const UserProfil: NextPage = (props: any) => {
  const [userName, setUserInfo] = useState();

  useEffect(() => {
    searchUserInDB();
  }, []);

  const searchUserInDB = async () => {
    const user = fetch("/api/searchbyid?searchId=" + props.userId)
      .then((res) => res.json())
      .then((user) => {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", user);
        setUserInfo(user.userName);
      });
  };
  return (
    <>
      <Layout>
        <div className="container">
          <p>{userName}</p>
          {/* <p>{userInfo[0].email}</p> */}
        </div>
        {/* <div className="bodyPost">
      <div className="BodyNews">
        {/* <div className="row">
          <div className="Nav">
            <nav className="navbar row">
              <div className="itemNavbar col-3"></div>
              <div className="profilPhoto col-6">
                <div className="profilImage">
                  <img
                    className="photoNav"
                    key={user[0].id}
                    src={user[0].photo}
                    alt=""
                  />
                </div>
              </div>
              <div className="itemNavbar col-3">
                <a href="/">Logout</a>
              </div>
            </nav>
          </div>
        </div> *
        <div className="row">
          <div className="BodyNews col-3">
            <div className="container">
              {errorMessage ? <p>{errorMessage}</p> : <></>}
              {user.map((value, index) => {
                return (
                  <div className="DivSugg" key={index}>
                    <div>
                      <img
                        key={value.id}
                        className="SuggestionProfil"
                        src={value.photo}
                        alt=""
                      />
                    </div>
                    <button className="btn btn-secondary">
                      Add {value.UserName}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="BodyNews col-5">
            
            <button onClick={() => setIsCommentVisible(!isCommentVisible)}>
              comment
            </button>
            {console.log(isCommentVisible)}
          </div>
          <div className="BodyNews col-4">
            <div className="container">
              <div>
                <div className="container">
                  <div className="row">
                    <div className="comment-card">
                      {isCommentVisible ? <CommentPost data={data} /> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div onSubmit={(e) => handleSubmit(e)} id="algin-form">
                <div className="form-group">
                  <h4>Leave a comment</h4>
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="msg"
                    cols={30}
                    rows={5}
                    onChange={handleChange}
                    className="form-control"
                    style={{ backgroundColor: "white" }}
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    id="post"
                    onClick={() => postComment()}
                    className="btn"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            </div> */}
      </Layout>
    </>
  );
};

export default UserProfil;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("juste context", context.query);

  return {
    props: {
      userId: context.query.userid,
    },
  };
};
