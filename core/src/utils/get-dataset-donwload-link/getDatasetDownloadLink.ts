import { GetDatasetDownloadLinkParams } from "@/utils/get-dataset-donwload-link/getDatasetDonwloadLink.types"
import apiRoutes from "@/constants/apiRoutes"

const getDatasetDonwloadLink = ({
  indicatorId,
  extension,
  countryId,
}: GetDatasetDownloadLinkParams) => {
  if (countryId) {
    return `${apiRoutes.public.download.country(
      indicatorId,
      countryId
    )}?format=${extension}`
  }

  return `${apiRoutes.public.download.indicator(indicatorId)}?format=${extension}`
}

export default getDatasetDonwloadLink
