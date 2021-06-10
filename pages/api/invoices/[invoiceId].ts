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
  } else if (req.method === "PATCH") {
    const data = req.body;
    try {
      await firestoreAdmin()
        .collection("invoices")
        .doc(invoiceId as string)
        .set({
          id: invoiceId,
          ...data,
        });
      res.status(200).json({ id: invoiceId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await firestoreAdmin()
        .collection("invoices")
        .doc(invoiceId as string)
        .delete();
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
