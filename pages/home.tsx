import { NextPage, GetServerSideProps } from "next";
import React from "react";
import { getDatabase } from "../util/mongodb";

const newsletter: NextPage<{ data; user }> = ({ data, user }) => {

  ///////////////////////////
  ////// Affichage /////////
  //////////////////////////
  return (
    <div>
      <div className="BodyNews">
        <div className="container">
          <div className="row">
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
                    key={user[0].id}
                    src={user[0].photo}
                    alt=""
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="BodyNews col-3">
            <div className="container">
              {user.map((value) => {
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
                      <div className="comment mt-4 text-justify float-left">
                        {" "}
                        <img
                          src="https://i.imgur.com/yTFUilP.jpg"
                          alt=""
                          className="rounded-circle"
                          width={40}
                          height={40}
                        />
                        <h4>Jhon Doe</h4> <span>- 20 October, 2018</span> <br />
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Accusamus numquam assumenda hic aliquam vero
                          sequi velit molestias doloremque molestiae dicta?
                        </p>
                      </div>
                      <div className="text-justify darker mt-4 float-right">
                        {" "}
                        <img
                          src="https://i.imgur.com/CFpa3nK.jpg"
                          alt=""
                          className="rounded-circle"
                          width={40}
                          height={40}
                        />
                        <h4>Rob Simpson</h4> <span>- 20 October, 2018</span>{" "}
                        <br />
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Accusamus numquam assumenda hic aliquam vero
                          sequi velit molestias doloremque molestiae dicta?
                        </p>
                      </div>
                      <div className="comment mt-4 text-justify">
                        {" "}
                        <img
                          src="https://i.imgur.com/yTFUilP.jpg"
                          alt=""
                          className="rounded-circle"
                          width={40}
                          height={40}
                        />
                        <h4>Jhon Doe</h4> <span>- 20 October, 2018</span> <br />
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Accusamus numquam assumenda hic aliquam vero
                          sequi velit molestias doloremque molestiae dicta?
                        </p>
                      </div>
                      <div className="darker mt-4 text-justify">
                        {" "}
                        <img
                          src="https://i.imgur.com/CFpa3nK.jpg"
                          alt=""
                          className="rounded-circle"
                          width={40}
                          height={40}
                        />
                        <h4>Rob Simpson</h4> <span>- 20 October, 2018</span>{" "}
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
              <form id="algin-form">
                <div className="form-group">
                  <h4>Leave a comment</h4>
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="msg"
                    cols={30}
                    rows={5}
                    className="form-control"
                    style={{ backgroundColor: "white" }}
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <button type="button" id="post" className="btn">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default newsletter;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const categoSport = await mongodb.db().collection("posts").find().toArray();
  const UserData = await mongodb.db().collection("user").find().toArray();
  const result = await categoSport.map((value) => {
    return {
      id: value.id,
      userId: value.userId,
      datePost: value.datePost,
      photosPost: value.photosPost,
      textPost: value.textPost,
      likePost: value.likePost,
      commentsPost: value.commentsPost,
    };
  });
  const result2 = await UserData.map((value) => {
    return {
      id: value.Id,
      UserName: value.UserName,
      photo: value.Cover,
    };
  });
  const fin = await JSON.parse(JSON.stringify(result));
  const fin2 = await JSON.parse(JSON.stringify(result2));
  return {
    props: {
      data: fin,
      user: fin2,
    },
  };
};
