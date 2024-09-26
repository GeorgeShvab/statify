import { ReactNode } from "react"
import { StoreApi } from "zustand"
import { CountriesStore } from "@/store/countries-store/types"
import { IndicatorsStore } from "@/store/indicators-store/types"

export type Stores = IndicatorsStore | CountriesStore

export interface StoreProviderProps {
  children: ReactNode
  createStore: () => StoreApi<Stores>
}
