import prisma from "../prisma";

export const getSuperUserId = async (): Promise<any> => {
  const getSuperUser = await prisma().user.findUnique({
    where: { email: process.env.NEXT_PUBLIC_UNICORN_USER},
  })
  return getSuperUser?.id
  // return 'cleiu29s20130c33kk3yab30t'
};