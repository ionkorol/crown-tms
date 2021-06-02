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
  } else {
    res.status(500).end();
  }
};
