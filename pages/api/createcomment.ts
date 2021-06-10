import { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await createComment(request.body);
  console.log(mongoResponse);
  if (mongoResponse.insertedCount === 1) {
    response.json({ message: "register OK" });
  } else {
    response.json({ message: "ERROR" });
  }
};
