// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "@/lib/secrets/secrets.ts";

import { companies, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const company = await prisma.companies.create({
    data: {
      name: "Test Company",
    },
  });
  console.log(company);
  res.status(200).json(company);
}
