// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { Document, Page, View } from '@react-pdf/renderer'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send({ name: "John Doe" });
};
