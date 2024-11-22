-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_countryId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
