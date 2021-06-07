import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const cookies = new Cookies(request, response);
  cookies.set("fewlines");

  response.writeHead(307, { Location: "/" });
  response.end();
};
