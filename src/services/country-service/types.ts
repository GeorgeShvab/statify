import { SortDirection } from "@/types/types"

export type AdminCountrySort =
  | "id"
  | "name"
  | "geocode"
  | "iso2code"
  | "datapoints"
  | "updatedAt"

export type AdminCountryType = "country" | "state" | "union" | "region"

export interface GetAdminCountriesParams {
  search?: string
  sortDirection: SortDirection
  sort: AdminCountrySort
  hidden?: boolean
  type?: AdminCountryType
}
