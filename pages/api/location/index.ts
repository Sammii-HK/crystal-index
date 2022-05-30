// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Location } from '@prisma/client'
import prisma from '../../../lib/prisma';

type LocationProps = {
  locations: Location[]
}

export default async function crystalsHandler(
  req: NextApiRequest,
  res: NextApiResponse<LocationProps>
) {
  const results = await prisma().location.findMany();
  res.status(200).json({ locations: results })
}
