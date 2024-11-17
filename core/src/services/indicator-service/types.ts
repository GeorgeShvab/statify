import { Indicator } from "@prisma/client"
import { Option } from "@/ui/select/Select.types"
import { PageableResult } from "@/types/general.types"
import { IndicatorWithDatapoints } from "@/types/indicator.types"

export type AdminIndicatorSort =
  | "id"
  | "label"
  | "datapoints"
  | "createdAt"
  | "updatedAt"

export interface GetForAdminParams {
  hidden?: boolean
  absolute?: boolean
  search?: string
  sort: AdminIndicatorSort
  sortDirection: "asc" | "desc"
}

export interface CreateIndicatorParams extends Partial<Indicator> {
  id: string
  label: string
  source: string
  precision: number
  ranking: number
  absolute: boolean
  hidden: boolean
  showChart: boolean
}

export interface SearchParams {
  query: string
  page: number
}

export interface IndicatorServiceInterface {
  deleteMany: (ids: string[]) => Promise<void>
  getSelectAutocomplete: () => Promise<Option[]>
  createOne: (data: CreateIndicatorParams) => Promise<Indicator>
  hideMany: (ids: string[]) => Promise<void>
  exposeMany: (ids: string[]) => Promise<void>
  updateOne: (data: Partial<Indicator> & Pick<Indicator, "id">) => Promise<void>
  getById: (id: string) => Promise<null | Indicator>
  getAll: () => Promise<Indicator[]>
  getManyByIds: (ids: string[]) => Promise<Indicator[]>
  getRelatedById: (ids: string) => Promise<Indicator[]>
  getForAdmin: (params: GetForAdminParams) => Promise<IndicatorWithDatapoints[]>
  getSearchAutocomplete: (query: string) => Promise<Indicator[]>
  search: (params: SearchParams) => Promise<PageableResult<Indicator[]>>
}
