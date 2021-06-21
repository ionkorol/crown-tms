// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";
import { LoadProp, UserProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { loadId } = req.query;
  if (req.method === "GET") {
    const { user } = req.headers;
    const userData = (await (
      await fetch(`${process.env.SERVER}/api/users/${user}`)
    ).json()) as UserProp;
    const loadSnap = await firestore()
      .collection("clients")
      .doc(userData.clientId)
      .collection("loads")
      .doc(loadId as string)
      .get();
    const loadData = loadSnap.data();
    const brokerSnap = await firestore()
      .collection("brokers")
      .doc(loadData.broker)
      .get();
    const brokerData = brokerSnap.data();
    res.status(200).json({ ...loadData, broker: brokerData });
  } else if (req.method === "PATCH") {
    const data = req.body;
    try {
      await firestore()
        .collection("loads")
        .doc(loadId as string)
        .set({
          id: loadId,
          ...data,
        });
      res.status(200).json({ id: loadId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await firestore()
        .collection("loads")
        .doc(loadId as string)
        .delete();
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
