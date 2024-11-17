/*
  Warnings:

  - You are about to drop the column `country` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `geographicRegion` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `union` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "country",
DROP COLUMN "geographicRegion",
DROP COLUMN "union",
ALTER COLUMN "type" DROP DEFAULT;
