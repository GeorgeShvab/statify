import apiRoutes from "@/constants/apiRoutes"
import { GetDatasetDownloadLinkParams } from "./getDatasetDonwloadLink.types"

const getDatasetDonwloadLink = ({
  indicatorId,
  extension,
  countryId,
}: GetDatasetDownloadLinkParams) => {
  if (countryId) {
    return `${apiRoutes.indicators.country.download(
      indicatorId,
      countryId
    )}?format=${extension}`
  }

  return `${apiRoutes.indicators.download(indicatorId)}?format=${extension}`
}

export default getDatasetDonwloadLink
