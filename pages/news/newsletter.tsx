import { NextPage, GetServerSideProps } from "next";
import React from "react";
import { getDatabase } from "../../util/mongodb";
const newsletter: NextPage<{ data; user }> = ({ data, user }) => {
  return (
    <div>
      <nav>
        <div className="row">
          <div className="itemNavbar col-3">
            <img className="logoNav" src="../logocarre.png" />
          </div>
          <div className="itemNavbar col-6">
            <form className="SearchBar d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="itemNavbar col-3">
            <img className="photoNav" src={user[0]} alt="" />
          </div>
        </div>
      </nav>
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
  const result2 = await UserData.map((value) => value.Cover);
  const fin = await JSON.parse(JSON.stringify(result));
  const fin2 = await JSON.parse(JSON.stringify(result2));
  return {
    props: {
      data: fin,
      user: fin2,
    },
  };
};
