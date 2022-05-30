import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export default function initOrGetPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};