/*
  Warnings:

  - You are about to drop the column `clientId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `client` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_clientId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "clientId",
ADD COLUMN     "client" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";
