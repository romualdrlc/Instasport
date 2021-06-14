import { NextApiRequest, NextApiResponse } from "next";
import { getCommentsByPost } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getCommentsByPost(request.query.postId);
  if (mongoResponse !== "") {
    response.json(mongoResponse);
  } else {
    response.send({ message: "ERROR" });
  }
};
