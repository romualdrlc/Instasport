import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import initClient from "../../../utils/initClient";
import {
  insertUser,
  isEmailFound,
  updateToken,
} from "../../../utils/initDatabase";
import { Console } from "console";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const code = request.query.code as string;
  const fewClient = initClient();

  const tokens = await fewClient.getTokensFromAuthorizationCode(code);

  console.log("token $$$$$$$$$$$$$$$$$$$$$$", tokens.access_token);

  var JWT = require("jsonwebtoken");

  const cliInfo = await fewClient.getUserInfo(tokens.access_token);

  console.log("info cli $$$$$$$$$$$$$$$$$$$$$$", cliInfo);

  const decoded: any = await fewClient.verifyJWT(tokens.access_token, "RS256");

  console.log("decoded $$$$$$$$$$$$$$$$$$$$$$", decoded.exp);

  response.setHeader(
    "Set-Cookie",
    `fewlines=${tokens.access_token}; Max-Age=3600000; Path=/`
  );
  // const databaseUrl = process.env.MONGODB_URI;
  // const options = { useNewUrlParser: true, useUnifiedTopology: true };
  // const mongoDataBase = await MongoClient.connect(databaseUrl, options);
  // const dateToIsert = Date();
  // try {
  //   mongoDataBase
  //     .db("instasportDB")
  //     .collection("cookies")
  //     .insertOne({
  //       cookie: { token: code, expdate: decoded.exp },
  //       email: cliInfo.email,
  //     });
  // } catch (e) {
  //   console.log(e);
  // }

  insertUser(code, decoded.exp, cliInfo.email);

  updateToken("toto", new Date(), "lebeaugose72@gmail.com");
  const toto = await isEmailFound("lebeaugose72@gmail.com");
  console.log(toto);

  if (toto) {
    console.log("email trouver");
  } else {
    console.log("pas trouver");
  }
  response.redirect("/register/inscription");
};

function JWT(JWT: any, arg1: string) {
  throw new Error("Function not implemented.");
}
