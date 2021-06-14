import { NextApiRequest, NextApiResponse } from "next";
import { getSearchUserById } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getSearchUserById(request.query.searchId);
  if (mongoResponse !== "") {
    response.json(mongoResponse);
  } else {
    response.send({ message: "ERROR" });
  }
};
