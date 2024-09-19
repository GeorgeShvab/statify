import { Indicator } from "@prisma/client"

export type AdminIndicatorSort =
  | "id"
  | "label"
  | "datapoints"
  | "createdAt"
  | "updatedAt"

export interface GetAdminIndicatorsParams {
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
