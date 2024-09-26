import { CountryWithDatapoints } from "@/types/types"

export interface CountriesDashboardProps {
  countries: CountryWithDatapoints[]
  sort: string
  search: string
  type: string
  status: string
  sortDirection: string
}
