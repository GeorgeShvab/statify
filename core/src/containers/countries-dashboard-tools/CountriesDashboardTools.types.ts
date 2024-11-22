export type DashboardCountryQueryParams = {
  sort: string
  search: string
  status: string
  type: string
}

export interface CountriesDashboardToolsProps {
  search: string
  sort: string
  sortDirection: string
  type: string
  status: string
}
