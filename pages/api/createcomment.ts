import { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await createComment(request.body);
};
