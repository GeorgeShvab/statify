import { AreaType } from "@prisma/client"
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
  type?: AreaType
}

export interface CreateCountryParams {
  id: string
  name: string
  geoCode?: string
  iso2Code?: string
  hidden: boolean
  type: AreaType
  searchTags?: string[]
}
