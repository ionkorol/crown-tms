// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getLoads from "lib/api/Loads/getLoads";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getLoads("100");
  res.status(200).json(data);
};
