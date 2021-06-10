// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "utils/firebaseAdmin";
import { InvoiceProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = req.body as InvoiceProp;

      const lastId = (
        await firestoreAdmin()
          .collection("invoices")
          .orderBy("id")
          .limitToLast(1)
          .get()
      ).docs[0].data().id;

      const currentId = lastId + 1;

      await firestoreAdmin()
        .collection("invoices")
        .doc(String(currentId))
        .set({
          ...data,
          id: currentId,
        });

      res.status(200).json({ id: currentId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const invoicesQuery = await firestoreAdmin().collection("invoices").get();
    let invoicesData = [];
    for (const invoiceSnap of invoicesQuery.docs) {
      const invoiceData = invoiceSnap.data();
      const brokerData = await (
        await fetch(`${process.env.SERVER}/api/brokers/${invoiceData.broker}`)
      ).json();
      invoicesData = [...invoicesData, { ...invoiceData, broker: brokerData }];
    }
    res.status(200).json(invoicesData);
  } else {
    res.status(500).end();
  }
};
