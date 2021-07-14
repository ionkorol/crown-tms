// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMGR } from "lib/api/Accounting";
import { getBroker } from "lib/api/Brokers";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { reportId } = req.query;
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "GET") {
    if (reportId === "mgr") {
      try {
        res.status(200).json(await getMGR(userData.clientId));
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  } else {
    res.status(500).end();
  }
};
