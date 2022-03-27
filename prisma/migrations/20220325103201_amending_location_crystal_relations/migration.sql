-- DropForeignKey
ALTER TABLE "Crystal" DROP CONSTRAINT "Crystal_mementoId_fkey";

-- DropForeignKey
ALTER TABLE "Crystal" DROP CONSTRAINT "Crystal_originId_fkey";

-- AlterTable
ALTER TABLE "Crystal" ALTER COLUMN "mementoId" DROP NOT NULL,
ALTER COLUMN "originId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_mementoId_fkey" FOREIGN KEY ("mementoId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
