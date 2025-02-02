import prisma, { AreaType } from "@prisma/client"
import { Option } from "@/ui/select/Select.types"
import {
  Country,
  CountryRowValue,
  CountryWithDatapoints,
  CountryWithValues,
} from "@/types/country.types"
import { SortOrder } from "@/types/general.types"

export type AdminCountrySort =
  | "id"
  | "name"
  | "geoCode"
  | "iso2Code"
  | "datapoints"
  | "updatedAt"

export interface GetForAdminParams {
  search?: string
  sortDirection: SortOrder
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

export type UpdateOneParams = Partial<Omit<prisma.Country, "mapping">> &
  Pick<prisma.Country, "id">

export interface CountryServiceInterface {
  createOne: (param: CreateCountryParams) => Promise<prisma.Country>
  deleteMany: (ids: string[]) => Promise<void>
  hideMany: (ids: string[]) => Promise<void>
  exposeMany: (ids: string[]) => Promise<void>
  updateOne: (param: UpdateOneParams) => Promise<void>
  getById: (id: string) => Promise<Country | null>
  getManyWithValuesByIndicator: (id: string) => Promise<CountryWithValues[]>
  getForAdmin: (param: GetForAdminParams) => Promise<CountryWithDatapoints[]>
  getSelectAutocomplete: () => Promise<Option[]>
  getCountryTableValues: (
    indicatorId: string,
    countryId: string
  ) => Promise<CountryWithValues>
  getIndicatorTableValues: (id: string) => Promise<CountryRowValue[]>
}
