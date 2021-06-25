// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (req.method === "GET") {
    try {
      const data = await getUser(userId as string);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
