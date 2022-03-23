import type { NextApiRequest, NextApiResponse } from 'next'
import { Location } from '@prisma/client'
import prisma from '../../../lib/prisma';

type LocationProps = {
  location: Location | undefined,
  error?: string,
}

export default async function main(
  req: NextApiRequest,
  res: NextApiResponse<LocationProps>
) {
  const data = req.body;

  try {
    const result = await prisma.location.create({
      data: { ...data },
    });

    res.status(200).json({ location: result });
    return result
  } catch (err) {
    console.log(err);
    res.status(403).json({ location: undefined, error: "Error occured while creating a new user." });
  }
}

