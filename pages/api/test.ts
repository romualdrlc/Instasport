import OAuth2Client, {
  OAuth2ClientConstructor,
} from "@fewlines/connect-client";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const oauthClientConstructorProps: OAuth2ClientConstructor = {
    openIDConfigurationURL:
      "https://fewlines.connect.prod.fewlines.tech/.well-known/openid-configuration",
    clientID: process.env.CONNECT_CLIENT_ID,
    clientSecret: process.env.CONNECT_CLIENT_SECRET,
    redirectURI: process.env.CONNECT_REDIRECT_URI,
    audience: "wdb2g1",
    scopes: ["openid", "email", "phone"],
  };

  const otClient = new OAuth2Client(oauthClientConstructorProps);

  const urlToSignIn = await otClient.getAuthorizationURL();

  const res = await fetch(urlToSignIn.href, {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};
