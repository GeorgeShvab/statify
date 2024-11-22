/*
  Warnings:

  - Changed the type of `type` on the `Country` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('region', 'union', 'country');

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "type",
ADD COLUMN     "type" "AreaType" NOT NULL;

-- DropEnum
DROP TYPE "Type";
