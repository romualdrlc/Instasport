
import { NextPage, GetServerSideProps } from "next";
import React from "react";
import { getDatabase } from "../util/mongodb";
const newsletter: NextPage<{ data; user }> = ({ data, user }) => {
  return (
    <div>
      <div className="BodyNews">
        <div className="container text-center">
          <img
            className="photoNav"
            key={user[0].id}
            src={user[0].photo}
            alt=""
          />

          <div className="row">
            <div className="Nav">
              <nav className="row">
                <p>INTERESTS</p>
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
                        <label
                          htmlFor="exampleInputBirthDate"
                          className="form-label"
                        >
                          Events
                        </label>
                        <input
                          type="Date"
                          className="form-control"
                          id="exampleInputBirthDate"
                          aria-describedby="emailHelp"
                          placeholder="BirthDate"
                        />
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
  );
};
export default newsletter;
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



export default UserProfile;

