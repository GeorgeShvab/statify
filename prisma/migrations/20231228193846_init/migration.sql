/*
  Warnings:

  - You are about to drop the column `related` on the `Indicator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Indicator" DROP COLUMN "related";

-- CreateTable
CREATE TABLE "_indicatorRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_indicatorRelation_AB_unique" ON "_indicatorRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_indicatorRelation_B_index" ON "_indicatorRelation"("B");

-- AddForeignKey
ALTER TABLE "_indicatorRelation" ADD CONSTRAINT "_indicatorRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Indicator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_indicatorRelation" ADD CONSTRAINT "_indicatorRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Indicator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
