import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Profil: NextPage<{ currentUsersEmail; data; user }> = ({
  currentUsersEmail,
  data,
  user,
}) => {
  /////////////////////
  ///// useState /////
  ////////////////////
  const [usersEmail, setUsersEmail] = useState(currentUsersEmail);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [like, setLike] = useState(0);

  const router = useRouter();

  /////////////////////
  ///// function /////
  ////////////////////
  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  /////////////////////
  ///// fetchApi /////
  ////////////////////
  const postComment = async () => {
    const data = {
      text: input,
    };
    await fetch("/api/postcomment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ERROR") {
          setErrorMessage("please enter a message");
        } else {
          router.push("/profil");
        }
      });
  };

  const postLike = async () => {
    const data = {
      likePost: like,
    };
    await fetch("/api/postlike", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ERROR") {
          setErrorMessage("please enter a message");
        } else {
          router.push("/profil");
        }
      });
  };

  ////////////////////
  //// useEffect ////
  ///////////////////
  useEffect(() => {}, [usersEmail, input]);

  ////////////////////
  //// Affichage ////
  ///////////////////
  return (
    <div className="bodyPost">
      <div className="BodyNews">
        <div className="row">
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
        </div>
        <div className="row">
          <div className="BodyNews col-3">
            <div className="container">
              {errorMessage ? <p>{errorMessage}</p> : <></>}
              {user.map((value, index) => {
                return (
                  <div className="DivSugg">
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
          <div className="BodyNews col-5"></div>
          <div className="BodyNews col-4">
            <div className="container">
              <div>
                <div className="container">
                  <div className="row">
                    <div className="">
                      <div className="darker mt-4 text-justify">
                        <img
                          src="https://i.imgur.com/CFpa3nK.jpg"
                          alt=""
                          className="rounded-circle"
                          width={40}
                          height={40}
                        />
                        <div>
                          <h4>{data[0].userId}</h4>
                          <br />
                          <span>{data[0].datePost}</span>
                          <br />
                          <p>{data[8].textPost}</p>
                        </div>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            like ? setLike(like - 1) : setLike(like + 1);
                          }}
                        >
                          {data[8].likePost
                            ? data[8].likePost + like
                            : data[8].likePost + like}
                        </button>
                      </div>
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
    </div>
  );

};

