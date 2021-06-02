import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("renvoi callback", request.query.code);

  const databaseUrl = process.env.MONGODB_URI;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoDataBase = await MongoClient.connect(databaseUrl, options);
  const dateToIsert = Date();
  try {
    mongoDataBase
      .db("instasportDB")
      .collection("cookies")
      .insertOne({ access_token: request.query.code, date: dateToIsert });
  } catch (e) {
    console.log(e);
  }

  response.redirect(`/oauth/callback?code=${request.query.code}`);
};
