// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Crystal } from '@prisma/client'
import prisma from '../../../../lib/prisma';
import { serializeCrystal } from '../../../../lib/helpers/serializeCrystalDates';
// import { SerialisableCrystalWithUser } from '../../../../lib/types/crystal';

type CrystalProps = {
  crystals: Crystal[]
  // crystals: SerialisableCrystalWithUser[]
}

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// }

export default async function crystalsHandler(
  req: NextApiRequest,
  res: NextApiResponse<CrystalProps>
) {
  const results = await prisma().crystal.findMany({
    where: { createdById: process.env.SUPER_USER_ID },
    include: { 
        createdBy: true,
        image: true,
        originLocation: {select: {placeName: true}},
        mementoLocation: {select: {placeName: true}},
        favouritedBy: { select: { id: true }},
        crystalInfo: true
      },
  });

  const serialisedCrystals = results.map(crystal => crystal && serializeCrystal(crystal))

  // return results.map(crystal => crystal && serializeCrystal(crystal))
  return res.status(200).json({ crystals: serialisedCrystals })
  // return results.map(crystal => crystal && serializeCrystal(crystal))

}
