import { CountryWithDatapoints } from "@/types/types"

export interface CountriesStore {
  countries: CountryWithDatapoints[]
  setCountries: (countries: CountryWithDatapoints[]) => void
  hideCountries: (ids: string[]) => void
  exposeCountries: (ids: string[]) => void
}
