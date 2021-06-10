import { NextApiRequest, NextApiResponse } from "next";
import { getCommentsByPost } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("tototototototoot", request.query.postId);
  const mongoResponse = await getCommentsByPost(request.query.postId);
  console.log("mongoresponse", mongoResponse);
  // const users = mongoResponse.map((value) => value.userName).toString();
  if (mongoResponse !== "") {
    response.json(mongoResponse);
  } else {
    response.send({ message: "ERROR" });
  }
};
