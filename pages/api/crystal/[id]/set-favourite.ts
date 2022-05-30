import type { NextApiRequest, NextApiResponse } from 'next'
import { Crystal } from '@prisma/client'
import prisma from '../../../../lib/prisma';


type CrystalProps = {
  crystal: Crystal | undefined,
  error?: string,
}

export default async function main(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const { userId, setFavourite }: { 
    userId: string,
    setFavourite: boolean,
  } = req.body;
  const { id } = req.query

  try {
    const result = await prisma().crystal.update({
      where: { id: parseInt(id as string) },
      data: {
        favouritedBy: {
          connect: setFavourite ? { id: userId } : undefined,
          disconnect: !setFavourite ? { id: userId } : undefined,
        },
      }
    });

    res.status(200).json({ crystal: result });
    return result
  } catch (err) {
    console.log(err);
    res.status(403).json({ crystal: undefined, error: `Error occured while updating a crystal id: ${id}.` });
  }
}

