// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getBroker } from "lib/api/Brokers";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { brokerId } = req.query;
  if (req.method === "GET") {
    try {
      const data = await getBroker(brokerId as string);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    const data = req.body;
    try {
      await firestore()
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
      await firestore()
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
