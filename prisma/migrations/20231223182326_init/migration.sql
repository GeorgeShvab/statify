-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "shortener" INTEGER,
ADD COLUMN     "showChart" BOOLEAN NOT NULL DEFAULT true;
