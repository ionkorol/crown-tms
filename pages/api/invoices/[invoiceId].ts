// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "utils/firebaseAdmin";
import { InvoiceProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { invoiceId } = req.query;
  if (req.method === "GET") {
    const invoiceSnap = await firestoreAdmin()
      .collection("invoices")
      .doc(invoiceId as string)
      .get();
    const invoiceData = invoiceSnap.data();
    const brokerSnap = await firestoreAdmin()
      .collection("brokers")
      .doc(invoiceData.broker)
      .get();
    const brokerData = brokerSnap.data();
    res.status(200).json({ ...invoiceData, broker: brokerData });
  } else {
    res.status(500).end();
  }
};
