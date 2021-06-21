// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (req.method === "GET") {
    const docSnap = await firestore()
      .collection("users")
      .doc(userId as string)
      .get();
    const docData = docSnap.data();
    res.status(200).json(docData);
  } else {
    res.status(500).end();
  }
};
