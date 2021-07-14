// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createLoad, getLoads } from "lib/api/Loads";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";
import { LoadProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "POST") {
    try {
      const loadData = req.body as LoadProp;
      const restData = await createLoad(userData.clientId, loadData);
      res.status(200).json(restData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const data = await getLoads(userData.clientId);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
