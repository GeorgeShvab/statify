import getDatasetDonwloadLink from "@/utils/get-dataset-donwload-link/getDatasetDownloadLink"
import apiRoutes from "@/constants/apiRoutes"

describe("Test getDatasetDownloadLink unit", () => {
  test("Should return correct download link for indicator dataset", () => {
    const result = getDatasetDonwloadLink({
      indicatorId: "ID",
      extension: "xlsx",
    })

    expect(result).toBe(
      `${apiRoutes.public.download.indicator("ID")}?format=xlsx`
    )
  })

  test("Should return correct download link for indicator country dataset", () => {
    const result = getDatasetDonwloadLink({
      indicatorId: "ID",
      extension: "xlsx",
      countryId: "UA",
    })

    expect(result).toBe(
      `${apiRoutes.public.download.country("ID", "UA")}?format=xlsx`
    )
  })
})
