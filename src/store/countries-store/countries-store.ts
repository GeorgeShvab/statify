import { createStore } from "zustand"
import { CountryWithDatapoints } from "@/types/types"
import { CountriesStore } from "./types"

const countriesStore = (initial: CountryWithDatapoints[]) => () =>
  createStore<CountriesStore>()((set) => ({
    countries: initial,
    setCountries: (countries: CountryWithDatapoints[]) => {
      set(() => ({ countries }))
    },
    hideCountries: (ids: string[]) =>
      set((state) => ({
        countries: state.countries.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: true } : item
        ),
      })),
    exposeCountries: (ids: string[]) =>
      set((state) => ({
        countries: state.countries.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: false } : item
        ),
      })),
  }))

export default countriesStore
