import { NextApiRequest, NextApiResponse } from "next";
import { getUserNameOnComment } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️", request.query);
  const mongoResponse = await getUserNameOnComment(request.query.idUser);

  console.log("reponse appel db", mongoResponse);

  response.json(mongoResponse);
};
