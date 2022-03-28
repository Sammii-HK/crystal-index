-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "crystalId" INTEGER;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_crystalId_fkey" FOREIGN KEY ("crystalId") REFERENCES "Crystal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
