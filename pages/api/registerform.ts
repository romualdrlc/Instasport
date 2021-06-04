import { NextApiRequest, NextApiResponse } from "next";
import { createNewUser } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.body)
  await createNewUser(request.body)
  response.redirect("/news/newsletter")
}
