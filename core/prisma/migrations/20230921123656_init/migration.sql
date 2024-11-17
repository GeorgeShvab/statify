-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "unitSymbol" TEXT,
ALTER COLUMN "absolute" DROP DEFAULT;
