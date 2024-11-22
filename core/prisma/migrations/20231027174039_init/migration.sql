/*
  Warnings:

  - A unique constraint covering the columns `[geoCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Country_geoCode_key" ON "Country"("geoCode");
