// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "utils/firebaseAdmin";
import { BrokerProp, InvoiceProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Add Broker
    try {
      const data = req.body as BrokerProp;
      const docRef = await firestoreAdmin()
        .collection("brokers")
        .add({
          ...data,
        });

      docRef.update({
        id: docRef.id,
      });

      res.status(200).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const brokersQuery = await firestoreAdmin().collection("brokers").get();
    const brokersData = brokersQuery.docs.map((item) => item.data());

    res.status(200).json(brokersData);
  } else {
    res.status(500).end();
  }
};
