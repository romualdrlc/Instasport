import { NextApiRequest, NextApiResponse } from "next";
import { getUserByCookie } from "../../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("response", response);
  const isCookie = await getUserByCookie(request.body);
  console.log("cookie or not cookie", isCookie);
  response.send(isCookie);
};
