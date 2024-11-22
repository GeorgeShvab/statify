/*
  Warnings:

  - Made the column `indicatorId` on table `Value` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Value" DROP CONSTRAINT "Value_indicatorId_fkey";

-- AlterTable
ALTER TABLE "Value" ALTER COLUMN "indicatorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
