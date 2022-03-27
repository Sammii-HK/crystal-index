/*
  Warnings:

  - You are about to drop the column `mementoId` on the `Crystal` table. All the data in the column will be lost.
  - You are about to drop the column `originId` on the `Crystal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placeName]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Crystal" DROP CONSTRAINT "Crystal_mementoId_fkey";

-- DropForeignKey
ALTER TABLE "Crystal" DROP CONSTRAINT "Crystal_originId_fkey";

-- AlterTable
ALTER TABLE "Crystal" DROP COLUMN "mementoId",
DROP COLUMN "originId",
ADD COLUMN     "memento" TEXT,
ADD COLUMN     "origin" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Location_placeName_key" ON "Location"("placeName");

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_memento_fkey" FOREIGN KEY ("memento") REFERENCES "Location"("placeName") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_origin_fkey" FOREIGN KEY ("origin") REFERENCES "Location"("placeName") ON DELETE SET NULL ON UPDATE CASCADE;
