import { SupportedDatasetDownloadExtension } from "@/types/types"

export interface GetDatasetDownloadLinkParams {
  indicatorId: string
  countryId?: string
  extension: SupportedDatasetDownloadExtension
}
