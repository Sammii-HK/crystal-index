import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export default function initOrGetPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma  


// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// function prisma() {
//   return globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });
// }

// export default prisma;
  

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma()  