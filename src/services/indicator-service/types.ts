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
