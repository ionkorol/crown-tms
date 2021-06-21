// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";
import { InvoiceProp, LoadProp, UserProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { invoiceId } = req.query;
  if (req.method === "GET") {
    const { user } = req.headers;
    const userData = (await (
      await fetch(`${process.env.SERVER}/api/users/${user}`)
    ).json()) as UserProp;
    const invoiceSnap = await firestore()
      .collection("clients")
      .doc(userData.clientId)
      .collection("invoices")
      .doc(invoiceId as string)
      .get();

    if (invoiceSnap.exists) {
      const invoiceData = invoiceSnap.data();
      const loadData = (await (
        await fetch(`${process.env.SERVER}/api/loads/${invoiceId}`, {
          headers: {
            user: user as string,
          },
        })
      ).json()) as LoadProp;
      res
        .status(200)
        .json({ ...invoiceData, broker: loadData.broker, load: loadData });
    } else {
      res.status(200).json(false);
    }
  } else if (req.method === "POST") {
    // Create Invoice
    try {
      const { user } = req.headers;
      const userData = (await (
        await fetch(`${process.env.SERVER}/api/users/${user}`)
      ).json()) as UserProp;
      const loadData = (await (
        await fetch(`${process.env.SERVER}/api/loads/${invoiceId}`, {
          headers: {
            user: user as string,
          },
        })
      ).json()) as LoadProp;

      const invoiceData = {
        id: Number(invoiceId),
        createdAt: Date.now(),
        status: "Created",
        balance: loadData.rate,
        additionalItems: [],
      } as InvoiceProp;

      await firestore()
        .collection("clients")
        .doc(userData.clientId)
        .collection("invoices")
        .doc(invoiceId as string)
        .set(invoiceData);
      res
        .status(200)
        .json({ ...invoiceData, load: loadData, broker: loadData.broker });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    const data = req.body;
    try {
      await firestore()
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
      await firestore()
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
