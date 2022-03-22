// prisma/seed.ts
import prismaPackage from '@prisma/client'
const { PrismaClient } = prismaPackage
// import { data } from '../data/links',
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'testemail@gmail.com',
      name: 'Test',
    },
  })

  // await prisma.link.createMany({
  //   data: data,
  // })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })