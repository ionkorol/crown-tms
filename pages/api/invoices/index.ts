// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getInvoices } from "lib/api/Invoices";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { user } = req.headers;
      const userData = await getUser(user as string);
      const data = await getInvoices(userData.clientId);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
