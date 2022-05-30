// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'
import prisma from '../../../lib/prisma';

type UserProps = {
  user: User | null
}

export default async function UserHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserProps>
) {

  const data = req.body

  const results = await prisma().user.findUnique({
    where: {
      email: data.user.email,
    },
    // include: {
    //   posts: true, // All posts where authorId == 20
    // },
  });
  res.status(200).json({ user: results })
}
