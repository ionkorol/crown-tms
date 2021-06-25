// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  changeInvoiceStatus,
  createInvoice,
  getInvoice,
} from "lib/api/Invoices";
import { getLoad } from "lib/api/Loads";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { invoiceId } = req.query;
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "GET") {
    // Get Invoice
    try {
      const data = await getInvoice(userData.clientId, invoiceId as string);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    // Create Invoice
    try {
      const invoiceData = await createInvoice(
        userData.clientId,
        invoiceId as string
      );
      res.status(200).json(invoiceData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    const { status } = req.body;
    const data = await changeInvoiceStatus(
      userData.clientId,
      invoiceId as string,
      status
    );
    res.status(200).json(data);
  } else {
    res.status(500).end();
  }
};
