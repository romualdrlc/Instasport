import { NextApiRequest, NextApiResponse } from "next";
import { getDafaultUsers } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("******************HERE******************");
  const mongoResponse = await getDafaultUsers();
  // if (mongoResponse.modifiedCount === 1) {
  //   response.json({ message: "register OK" });
  // } else {
  //   response.json({ message: "ERROR" });
  // }
  return mongoResponse;
};
