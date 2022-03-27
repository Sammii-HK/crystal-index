import type { NextApiRequest, NextApiResponse } from 'next'
import { Location } from '@prisma/client'
import prisma from '../../../../lib/prisma';


type CrystalProps = {
  location: Location | undefined,
  error?: string,
}

export default async function main(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const data = req.body;
  const { id } = req.query

  try {
    const result = await prisma.location.update({
      where: { id: parseInt(id as string) },
      data: { ...data },
    });

    res.status(200).json({ location: result });
    return result
  } catch (err) {
    console.log(err);
    res.status(403).json({ location: undefined, error: `Error occured while updating location id: ${id}.` });
  }
}

