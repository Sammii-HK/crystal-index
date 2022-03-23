/*
  Warnings:

  - Added the required column `createdById` to the `Crystal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crystal" ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Favourite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "crystalId" INTEGER NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "placeName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
