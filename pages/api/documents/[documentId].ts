// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  createDocument,
  deleteDocument,
  getDocuments,
} from "lib/api/Documents";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.headers;
  const userData = await getUser(user as string);
  const { documentId } = req.query;
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "DELETE") {
    try {
      await deleteDocument(userData.clientId, documentId as string);
      res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  } else {
    res.status(500).end();
  }
};
