// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "@/lib/secrets/secrets";

import { users, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await prisma.users.create({
    data: {
      name: "Test User",
      email: "test@user.co",
    },
  });
  console.log(user);
  res.status(200).json(user);
}
