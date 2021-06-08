import { NextApiRequest, NextApiResponse } from "next";
import { completeCreationNewUser } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await completeCreationNewUser(request.body);
  if (mongoResponse.modifiedCount === 1) {
    response.json({ message: "register OK" });
  } else {
    response.json({ message: "ERROR" });
  }
};
