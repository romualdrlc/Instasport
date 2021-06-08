import { NextApiRequest, NextApiResponse } from "next";
import { getSearchUserById } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("tototototototoot", request.query.searchId);
  const mongoResponse = await getSearchUserById(request.query.searchId);
  console.log("mongoresponse", mongoResponse);
  // const users = mongoResponse.map((value) => value.userName).toString();
  if (mongoResponse !== "") {
    response.json(mongoResponse);
  } else {
    response.send({ message: "ERROR" });
  }
};
