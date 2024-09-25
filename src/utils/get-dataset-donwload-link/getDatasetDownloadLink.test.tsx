import getDatasetDonwloadLink from "./getDatasetDownloadLink"

describe("Test getDatasetDownloadLink unit", () => {
  test("Should return correct download link for indicator dataset", () => {
    const result = getDatasetDonwloadLink({
      indicatorId: "ID",
      extension: "xlsx",
    })

    expect(result).toBe("/api/download/ID?format=xlsx")
  })

  test("Should return correct download link for indicator country dataset", () => {
    const result = getDatasetDonwloadLink({
      indicatorId: "ID",
      extension: "xlsx",
      countryId: "UA",
    })

    expect(result).toBe("/api/download/ID/UA?format=xlsx")
  })
})
