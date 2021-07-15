import { createDocument, getDocuments } from "lib/api/Documents";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentProp } from "utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "GET") {
    const data = await getDocuments(userData.clientId);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const data = req.body as DocumentProp;
    try {
      await createDocument(userData.clientId, { ...data }, userData.id);
      res.status(200).json(true);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).end();
  }
};
