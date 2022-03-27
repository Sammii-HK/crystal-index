// prisma/seed.ts
import prismaPackage from '@prisma/client'
const { PrismaClient } = prismaPackage
// import { data } from '../data/links',
const prisma = new PrismaClient()

async function main() {
  await prisma.location.create({
    data: {
      placeName: 'Covent Garden',
      country: 'England',
      lat: '51.5117',
      long: '0.1240',
    },
  })

  // await prisma.crystal.create({
  //   data: {
  //     name: 'Rose Quartz',
  //     colour: ['pink'],
  //     createdById: 'cl15djwzd0000di3k90xv0bcr',
  //   },
  // })

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