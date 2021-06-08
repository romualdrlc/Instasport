import { NextApiRequest, NextApiResponse } from "next";
import { logoutUser } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await logoutUser(request.query);

  console.log("reponse appel db", mongoResponse);
  // if (mongoResponse.insertedCount === 1) {
  //   response.json({ message: "register OK" });
  // } else {
  //   response.json({ message: "ERROR" });
  // }
};
