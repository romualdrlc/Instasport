import { NextPage, GetServerSideProps } from "next";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase } from "../../util/mongodb";

type News = {
    data: [{
        id: number,
        user: string,
        date: string,
        photo: string[],
        text: string,
        like: number[],
        comment: number[],  
    }]
    
}

const NewsLetter: NextPage<News> = ({data}) => {
    console.log(data);
    return (
        <div>
            {data.map((value) => {
                <div key={value.id}>
                <h1 className="bg-primary">{value.text}</h1>
                </div>
            })}
            <h1 className="bg-white"></h1>
        </div>
    )
}

export default NewsLetter;

export const getServerSideProps: GetServerSideProps = async () => {
    const mongodb = await getDatabase();
    const news = await mongodb.db().collection("posts").find().toArray();
    const result = await news.map((value) => {
        return {
            id: value.id,
            user: value.userId,
            date: value.datePost,
            photo: value.photosPost,
            text: value.textPost,
            like: value.likePost,
            comment: value.commentsPost,
        };
    });
    const fin = await JSON.parse(JSON.stringify(result));
    return {
        props: {
          data: fin,
        },
      };
}