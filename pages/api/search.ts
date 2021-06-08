import { NextApiRequest, NextApiResponse } from "next";
import { getSearch } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getSearch(request.body);
  console.log("reponse appel db", mongoResponse);
  // if (mongoResponse.insertedCount === 1) {
  //   response.json({ message: "register OK" });
  // } else {
  //   response.json({ message: "ERROR" });
  // }
};
