import { NextApiRequest, NextApiResponse } from "next";
import { getSearch } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getSearch(request.query);

  const users = mongoResponse.map((value) => value.userName).toString();
  if (users !== "") {
    response.json(mongoResponse);
  } else {
    response.send({ message: "ERROR" });
  }
};
