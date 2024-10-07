import { CountryWithDatapoints } from "@/types/types"

export interface CountriesStore {
  countries: CountryWithDatapoints[]
  setCountries: (countries: CountryWithDatapoints[]) => void
  hideCountries: (ids: string[]) => void
  exposeCountries: (ids: string[]) => void
  updateCountry: (
    country: Partial<CountryWithDatapoints> & Pick<CountryWithDatapoints, "id">
  ) => void
  deleteCountries: (id: string[]) => void
  backupData: CountryWithDatapoints[]
  backup: () => void
  revert: () => void
}
