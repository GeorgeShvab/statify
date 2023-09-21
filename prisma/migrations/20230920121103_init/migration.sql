/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Value" DROP CONSTRAINT "Value_countryId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Country_id_seq";

-- AlterTable
ALTER TABLE "Value" ALTER COLUMN "countryId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
