-- CreateTable
CREATE TABLE "CrystalInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "CrystalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CrystalInfo_name_key" ON "CrystalInfo"("name");

-- AddForeignKey
ALTER TABLE "Crystal" ADD CONSTRAINT "Crystal_bio_fkey" FOREIGN KEY ("bio") REFERENCES "CrystalInfo"("name") ON DELETE SET NULL ON UPDATE CASCADE;
