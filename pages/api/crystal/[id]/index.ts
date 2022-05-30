// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Crystal } from '@prisma/client'
import prisma from '../../../../lib/prisma';

type CrystalProps = {
  crystal: Crystal
}

export default async function crystalHandler(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const { id } = req.query;
  
  const result = await prisma().crystal.findUnique(
    { 
      where: { id: parseInt(id as string) },
      include: { 
        createdBy: true, 
        originLocation: true, 
        mementoLocation: true,
        image: true,
      },
    }
  )
  
  if (result) res.status(200).json({ crystal: result })
}
