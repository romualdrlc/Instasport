import { NextApiRequest, NextApiResponse } from "next";
import initClient from "../../../utils/initClient";
import {
  insertUser,
  isEmailFound,
  updateToken,
  getEmailByCookie,
} from "../../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const code = request.query.code as string;
  const fewClient = initClient();

  const tokens = await fewClient.getTokensFromAuthorizationCode(code);

  var JWT = require("jsonwebtoken");

  const cliInfo = await fewClient.getUserInfo(tokens.access_token);

  const decoded: any = await fewClient.verifyJWT(tokens.access_token, "RS256");

  response.setHeader(
    "Set-Cookie",
    `fewlines=${tokens.refresh_token}; Max-Age=3600000; Path=/`
  );

  insertUser(tokens.refresh_token, decoded.exp, cliInfo.email);

  updateToken("toto", new Date(), cliInfo.email);
  const toto = await isEmailFound(cliInfo.email);

  response.redirect("/register/inscription");
};

function JWT(JWT: any, arg1: string) {
  throw new Error("Function not implemented.");
}
