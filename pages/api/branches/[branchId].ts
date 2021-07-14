import { deleteBranch } from "lib/api/Branches";
import { getUser } from "lib/api/Users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { branchId } = req.query;
  const { user } = req.headers;
  const userData = await getUser(user as string);
  if (!userData) {
    res.status(401).end();
  } else if (req.method === "DELETE") {
    const data = await deleteBranch(userData.clientId, branchId as string);
    res.status(200).json(data);
  } else {
    res.status(500).end();
  }
};
