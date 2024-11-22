-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "geographicRegion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "independentState" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "internationallyRecognized" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "union" BOOLEAN NOT NULL DEFAULT false;
