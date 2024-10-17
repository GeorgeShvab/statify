import { SupportedDatasetDownloadExtension } from "@/types/general.types"

export interface GetDatasetDownloadLinkParams {
  indicatorId: string
  countryId?: string
  extension: SupportedDatasetDownloadExtension
}
