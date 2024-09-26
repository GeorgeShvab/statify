import { SortDirection } from "@/types/types"

export type AdminCountrySort =
  | "id"
  | "name"
  | "geoCode"
  | "iso2Code"
  | "datapoints"
  | "updatedAt"

export interface GetAdminCountriesParams {
  search?: string
  sortDirection: SortDirection
  sort: AdminCountrySort
  hidden?: boolean
  isCountry?: boolean
  isState?: boolean
  isUnion?: boolean
  isRegion?: boolean
}
