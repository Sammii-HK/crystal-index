// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Crystal } from '@prisma/client'
import prisma from '../../../lib/prisma';

type CrystalProps = {
  crystals: Crystal[]
}

export default async function crystalsHandler(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const results = await prisma.crystal.findMany();
  res.status(200).json({ crystals: results })
}
