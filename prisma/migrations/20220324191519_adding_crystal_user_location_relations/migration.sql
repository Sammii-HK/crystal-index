/*
  Warnings:

  - Added the required column `mementoId` to the `Crystal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originId` to the `Crystal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crystal" ADD COLUMN     "mementoId" INTEGER NOT NULL,
ADD COLUMN     "originId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_favouriteCrystals" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favouriteCrystals_AB_unique" ON "_favouriteCrystals"("A", "B");

-- CreateIndex
CREATE INDEX "_favouriteCrystals_B_index" ON "_favouriteCrystals"("B");

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_mementoId_fkey" FOREIGN KEY ("mementoId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouriteCrystals" ADD FOREIGN KEY ("A") REFERENCES "Crystal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouriteCrystals" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
