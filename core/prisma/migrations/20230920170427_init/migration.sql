-- CreateIndex
CREATE INDEX "Country_id_idx" ON "Country"("id" ASC);

-- CreateIndex
CREATE INDEX "Value_countryId_idx" ON "Value"("countryId" ASC);

-- CreateIndex
CREATE INDEX "Value_indicatorId_idx" ON "Value"("indicatorId" ASC);
