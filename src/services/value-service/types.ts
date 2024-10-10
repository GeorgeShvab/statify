import { Value } from "@prisma/client"
import { possibleValueSortQueryParam } from "@/app/(admin)/admin/dashboard/values/constants"

export interface GetAdminValuesParams {
  sort: (typeof possibleValueSortQueryParam)[number]
  country?: string
  indicator?: string
  sortDirection?: "asc" | "desc"
  offset?: number
}

export type CreateValueParams = Pick<
  Value,
  "value" | "year" | "countryId" | "indicatorId"
>
