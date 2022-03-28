import type { NextApiRequest, NextApiResponse } from 'next'
import { Crystal, Image } from '@prisma/client'
import prisma from '../../../lib/prisma';


type CrystalProps = {
  crystal: Crystal | undefined,
  error?: string,
}

export default async function main(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const { crystal, imageIds }: { crystal: Crystal, imageIds: number[] } = req.body;

  try {
    const result = await prisma.crystal.create({
      data: {
        ...crystal,
        image: {
          connect: imageIds.map(id => ({ id }))
        }},
    });

    res.status(200).json({ crystal: result });
    return result
  } catch (err) {
    console.log(err);
    res.status(403).json({ crystal: undefined, error: "Error occured while creating a new user." });
  }
}