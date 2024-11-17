/*
  Warnings:

  - You are about to drop the column `geocode` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "geocode",
ADD COLUMN     "geoCode" TEXT;
