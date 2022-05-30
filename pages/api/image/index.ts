// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Image } from '@prisma/client'
import prisma from '../../../lib/prisma';

type CrystalProps = {
  images: Image[]
}

export default async function crystalsHandler(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const results = await prisma().image.findMany();
  
  res.status(200).json({ images: results })
}
