import { NextApiRequest, NextApiResponse } from "next";
import { getDefaultUsers } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getDefaultUsers();
  response.send(mongoResponse);
};
