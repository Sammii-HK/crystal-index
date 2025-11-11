import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function prisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return globalForPrisma.prisma;
}

// For backward compatibility
export default prisma;

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (process.env.NODE_ENV != "production") globalForPrisma.prisma;





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