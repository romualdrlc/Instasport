import { NextApiRequest, NextApiResponse } from "next";
import { createNewUser } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.body);
  const mongoResponse = await createNewUser(request.body);
  console.log(mongoResponse.modifiedCount);
  if (mongoResponse.modifiedCount === 1) {
    response.json({ message: "register OK" });
  } else {
    response.json({ message: "ERROR" });
  }
};
