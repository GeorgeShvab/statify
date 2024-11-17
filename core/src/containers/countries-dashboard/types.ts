import { CountryWithDatapoints } from "@/types/country.types"

export interface CountriesDashboardProps {
  countries: CountryWithDatapoints[]
  sort: string
  search: string
  type: string
  status: string
  sortDirection: string
}
