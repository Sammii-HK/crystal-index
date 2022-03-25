// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Location } from '@prisma/client'
import prisma from '../../../lib/prisma';

type LocationProps = {
  location: Location
}

export default async function locationHandler(
  req: NextApiRequest,
  res: NextApiResponse<LocationProps>
) {
  const { id } = req.query
  console.log("id", id);
  
  const result = await prisma.location.findUnique(
    { 
      where: { id: parseInt(id as string) },
      // include: { memento: true },
    }
  );
  if (result) res.status(200).json({ location: result })
}
