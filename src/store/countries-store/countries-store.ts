import { createStore } from "zustand"
import { CountriesStore } from "@/store/countries-store/types"
import { CountryWithDatapoints } from "@/types/types"

const countriesStore = (initial: CountryWithDatapoints[]) => () =>
  createStore<CountriesStore>()((set) => ({
    countries: initial,
    setCountries: (countries) => {
      set({ countries })
    },
    hideCountries: (ids) =>
      set((state) => ({
        countries: state.countries.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: true } : item
        ),
      })),
    exposeCountries: (ids) =>
      set((state) => ({
        countries: state.countries.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: false } : item
        ),
      })),
    updateCountry: (country) =>
      set((state) => ({
        countries: state.countries.map((item) =>
          item.id === country.id ? { ...item, ...country } : item
        ),
      })),
    deleteCountries: (ids) =>
      set((state) => ({
        countries: state.countries.filter((item) => !ids.includes(item.id)),
      })),
    backupData: [],
    backup: () => set((state) => ({ backupData: state.countries })),
    revert: () =>
      set((state) => ({ countries: state.backupData || state.countries })),
  }))

export default countriesStore
