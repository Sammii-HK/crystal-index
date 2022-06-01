import { UserRole } from './../../../../lib/types/user';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'
import prisma from '../../../../lib/prisma';
import { getUserFromAPISession } from '../../../../lib/session';

type UserProps = {
  user: User | undefined,
  error?: string,
}

export default async function main(
  req: NextApiRequest,
  res: NextApiResponse<UserProps>
) {
  const user = await getUserFromAPISession(req)

  if (user?.role === 'unicorn') {
    const { role } = req.body
    const { id } = req.query
  
    try {
      const result = await prisma().user.update({
        where: { id: (id as string) },
        data: { 
          role: role,
        },
      });
  
      res.status(200).json({ user: result });
      return result
    } catch (err) {
      console.log(err);
      res.status(403).json({ user: undefined, error: `Error occured while setting role to user` })
    }
  } else res.status(401).json({ user: undefined, error: "You do not have the permissions to change roles" })
}