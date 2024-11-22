-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ranking" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tags" TEXT[];
