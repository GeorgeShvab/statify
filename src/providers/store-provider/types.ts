import { ReactNode } from "react"
import { StoreApi } from "zustand"
import { IndicatorsStore } from "@/store/indicators-store/types"

export type Stores = IndicatorsStore

export interface StoreProviderProps {
  children: ReactNode
  createStore: () => StoreApi<Stores>
}
