// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "utils/firebaseAdmin";
import { BrokerProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { brokerId } = req.query;
  if (req.method === "GET") {
    const snap = await firestoreAdmin()
      .collection("brokers")
      .doc(brokerId as string)
      .get();
    const data = snap.data();

    res.status(200).json(data);
  } else if (req.method === "PATCH") {
    const data = req.body;
    try {
      await firestoreAdmin()
        .collection("brokers")
        .doc(brokerId as string)
        .set({
          id: brokerId,
          ...data,
        });
      res.status(200).json({ id: brokerId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await firestoreAdmin()
        .collection("brokers")
        .doc(brokerId as string)
        .delete();
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
