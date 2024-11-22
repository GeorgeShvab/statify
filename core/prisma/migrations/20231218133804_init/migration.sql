/*
  Warnings:

  - Made the column `name` on table `Country` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "name" SET NOT NULL;
