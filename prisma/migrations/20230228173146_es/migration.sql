/*
  Warnings:

  - A unique constraint covering the columns `[info]` on the table `CrystalInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Crystal" DROP CONSTRAINT "Crystal_bio_fkey";

-- AlterTable
ALTER TABLE "Crystal" ADD COLUMN     "crystalInfoId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT E'user';

-- CreateIndex
CREATE UNIQUE INDEX "CrystalInfo_info_key" ON "CrystalInfo"("info");

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_crystalInfoId_fkey" FOREIGN KEY ("crystalInfoId") REFERENCES "CrystalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
