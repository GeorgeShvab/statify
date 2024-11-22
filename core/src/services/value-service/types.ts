import { Value } from "@prisma/client"
import { possibleValueSortQueryParam } from "@/app/(admin)/admin/dashboard/values/constants"

export interface GetForAdminParams {
  sort: (typeof possibleValueSortQueryParam)[number]
  country?: string
  indicator?: string
  sortDirection?: "asc" | "desc"
  take?: number
  skip?: number
}

export interface GetForAdminResult {
  data: Value[]
  count: number
}

export type CreateValueParams = Pick<
  Value,
  "value" | "year" | "countryId" | "indicatorId"
>

export type GetParams = Pick<Value, "countryId" | "indicatorId">

export type UpdateOneParams = Partial<Value> & Pick<Value, "id">

export interface ValueServiceInterface {
  createOne: (data: CreateValueParams) => Promise<Value>
  updateOne: (params: UpdateOneParams) => Promise<void>
  deleteMany: (ids: number[]) => Promise<void>
  deleteManyByCountry: (ids: string[]) => Promise<void>
  deleteManyByIndicator: (ids: string[]) => Promise<void>
  getByIndicatorAndCountry: (params: GetParams) => Promise<Value[]>
  getForAdmin: (params: GetForAdminParams) => Promise<GetForAdminResult>
}
