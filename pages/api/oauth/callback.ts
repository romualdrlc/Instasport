import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import { setCookie } from "../../../utils/cookies";

import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  // console.log("******************", response);
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
  await runMiddleware(request, response, cors);
  console.log("*******££¨%MLKK3", response);
  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  setCookie(response, "Next.js", "api-middleware!");
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  // response.end(response.getHeader("Set-Cookie"));
  response.getHeader("Set-Cookie");
  response.redirect(`/usersnews`);
};
export const getServerSideProps = async (context) => {
  // console.log("$$$$$$$$$$$", context);
  return {
    props: { context: context },
  };
};
