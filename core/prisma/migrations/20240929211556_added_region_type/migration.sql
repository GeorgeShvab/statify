/*
  Warnings:

  - Added the required column `type` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('region', 'union', 'country');

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "type" "Type" NOT NULL;
