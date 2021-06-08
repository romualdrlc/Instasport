import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { getDatabase } from "../utils/mongodb";

const CommentPost: NextPage<{ data }> = ({ data }) => {
    const [like, setLike] = useState(0);
    return (
        data.map((value, index) => {
          return (
            <div className="card-comment darker mt-4 text-justify" key={index}>
              <img
                src="https://i.imgur.com/CFpa3nK.jpg"
                alt=""
                className="rounded-circle"
                width={40}
                height={40}
              />
              <div>
                <h4>{value.userId}</h4>
                <br />
                <span>{value.datePost}</span>
                <br />
                <p>{value.textPost}</p>
              </div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  like ? setLike(like - 1) : setLike(like + 1);
                }}
              >
                {value.likePost ? value.likePost + like : value.likePost + like}
              </button>
            </div>
          );
        })
    );
};

export default CommentPost;

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
