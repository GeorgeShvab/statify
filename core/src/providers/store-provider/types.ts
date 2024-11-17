import { DependencyList, ReactNode } from "react"
import { StoreApi } from "zustand"
import { CountriesStore } from "@/store/countries-store/types"
import { IndicatorsStore } from "@/store/indicators-store/types"
import { ValuesStore } from "@/store/values-store/types"

export type Stores = IndicatorsStore | CountriesStore | ValuesStore

export interface StoreProviderProps<TStore extends Stores> {
  children: ReactNode
  createStore: () => StoreApi<TStore>
  onUpdate?: (store: StoreApi<TStore>) => void
  onUpdateDeps?: DependencyList
}
