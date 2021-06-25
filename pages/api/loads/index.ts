// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";
import { LoadProp, UserProp } from "utils/interfaces";
import nookies from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = req.body as LoadProp;
      const { user } = req.headers;

      const userData = (await (
        await fetch(`${process.env.SERVER}/api/users/${user}`)
      ).json()) as UserProp;

      const lastId = (
        await firestore()
          .collection("clients")
          .doc(userData.clientId)
          .collection("loads")
          .orderBy("id")
          .limitToLast(1)
          .get()
      ).docs[0].data().id;

      const currentId = lastId + 1;

      await firestore()
        .collection("clients")
        .doc(userData.clientId)
        .collection("loads")
        .doc(String(currentId))
        .set({
          ...data,
          id: currentId,
          createdAt: Date.now(),
          notes: [],
          status: "Complete",
        } as LoadProp);

      res.status(200).json({ id: currentId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { user } = req.headers;
      const userData = (await (
        await fetch(`${process.env.SERVER}/api/users/${user}`)
      ).json()) as UserProp;
      const loadsQuery = await firestore()
        .collection("clients")
        .doc(userData.clientId)
        .collection("loads")
        .orderBy("id")
        .limitToLast(10)
        .get();
      let loadsData = [];
      for (const loadSnap of loadsQuery.docs) {
        const loadData = loadSnap.data() as LoadProp;
        const brokerData = await (
          await fetch(`${process.env.SERVER}/api/brokers/${loadData.broker}`)
        ).json();
        loadsData = [...loadsData, { ...loadData, broker: brokerData }];
      }
      res.status(200).json(loadsData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
