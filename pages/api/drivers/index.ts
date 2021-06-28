import { createDriver } from "lib/api/Drivers";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "POST") {
    const data = req.body;
    const response = await createDriver(userData.clientId, data);
    res.status(200).json(response);
  } else {
    res.status(500).end();
  }
};
