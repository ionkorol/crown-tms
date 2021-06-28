import { getUser } from "lib/api/Users";
import { createVehicle, getVehicles } from "lib/api/Vehicles";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "POST") {
    const data = req.body;
    const response = await createVehicle(userData.clientId, data);
    res.status(200).json(response);
  } else if (req.method === "GET") {
    const data = await getVehicles(userData.clientId);
    return data;
  } else {
    res.status(500).end();
  }
};
