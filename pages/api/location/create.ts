import { checkUser } from './../../../lib/helpers/checkUser';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Location } from '@prisma/client'
import prisma from '../../../lib/prisma';
import { getUserFromAPISession } from '../../../lib/session';

type LocationProps = {
  location: Location | undefined,
  error?: string,
}

export default async function main(
  req: NextApiRequest,
  res: NextApiResponse<LocationProps>
) {
  const user = await getUserFromAPISession(req)
  const data = req.body;

  if (user && checkUser(user)) {
    try {
      const result = await prisma().location.create({
        data: { ...data },
      });
  
      res.status(200).json({ location: result });
      return result
    } catch (err) {
      console.log(err);
      res.status(403).json({ location: undefined, error: "Error occured while creating a new location." });
    }
  } else res.status(401).json({ location: undefined, error: "You do not have access to create a location."})

}

