export type DashboardValueQueryParams = {
  sort?: string
  search?: string
  country?: string
  indicator?: string
  sortDirection?: string
}

export type ValueSort =
  | "id"
  | "value"
  | "year"
  | "updatedAt"
  | "indicatorId"
  | "countryId"
