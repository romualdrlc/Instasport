import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const code = request.query.code as string;

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.CONNECT_REDIRECT_URI || "");

  const base64Keys = Buffer.from(
    `${process.env.CONNECT_CLIENT_ID}:${process.env.CONNECT_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(
    "https://fewlines.connect.prod.fewlines.tech/oauth/token",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Keys}`,
      },
      body: params,
    }
  );

  const { access_token } = await res.json();
  console.log("token", access_token);

  response.setHeader(
    "Set-Cookie",
    `fewlines=${access_token}; Max-Age=3600000; Path=/`
  );
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

  response.redirect("/register/inscription");
};

// export default async (request: NextApiRequest, response: NextApiResponse) => {
//   // console.log("******************", response);
//   const databaseUrl = process.env.MONGODB_URI;
//   const options = { useNewUrlParser: true, useUnifiedTopology: true };
//   const mongoDataBase = await MongoClient.connect(databaseUrl, options);
//   const dateToIsert = Date();
//   try {
//     mongoDataBase
//       .db("instasportDB")
//       .collection("cookies")
//       .insertOne({ access_token: request.query.code, date: dateToIsert });
//   } catch (e) {
//     console.log(e);
//   }
//   await runMiddleware(request, response, cors);
//   console.log("*******££¨%MLKK3", response);
//   // Calling our pure function using the `res` object, it will add the `set-cookie` header
//   setCookie(response, "Next.js", "api-middleware!");
//   // Return the `set-cookie` header so we can display it in the browser and show that it works!
//   // response.end(response.getHeader("Set-Cookie"));
//   response.getHeader("Set-Cookie");
//   response.redirect(`/usersnews`);
// };
// export const getServerSideProps = async (context) => {
//   // console.log("$$$$$$$$$$$", context);
//   return {
//     props: { context: context },
//   };
// };
