// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "utils/firebaseAdmin";
import { FileProp, LoadProp, UserProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { loadId } = req.query;
  if (req.method === "GET") {
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
      .get();

    const filesData = filesQuery.docs.map((fileSnap) => fileSnap.data());

    res.status(200).json(filesData);
  } else if (req.method === "POST") {
    // Upload File
    try {
      const data = req.body as FileProp;

      const { user } = req.headers;
      const userData = (await (
        await fetch(`${process.env.SERVER}/api/users/${user}`)
      ).json()) as UserProp;
      const fileRef = await firestore()
        .collection("clients")
        .doc(userData.clientId)
        .collection("loads")
        .doc(loadId as string)
        .collection("files")
        .add({
          createdAt: Date.now(),
          type: data.type,
          fileName: `${data.type} - Load# ${loadId}.pdf`,
          uploadedBy: user,
          ref: data.ref,
        } as FileProp);

      await fileRef.update({
        id: fileRef.id,
      });

      res.status(200).json(true);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
