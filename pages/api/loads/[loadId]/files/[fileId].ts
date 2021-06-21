// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";
import { FileProp, LoadProp, UserProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { loadId, fileId } = req.query;
  if (req.method === "DELETE") {
    try {
      const { user } = req.headers;
      const userData = (await (
        await fetch(`${process.env.SERVER}/api/users/${user}`)
      ).json()) as UserProp;
      const filesQuery = await firestore()
        .collection("clients")
        .doc(userData.clientId)
        .collection("loads")
        .doc(loadId as string)
        .collection("files")
        .doc(fileId as string)
        .delete();
      res.status(200).json(true);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
