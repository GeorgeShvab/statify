import { ReactNode } from "react"
import { StoreApi } from "zustand"
import { SelectableStore } from "@/store/selectable-store/types"

export type Stores = SelectableStore

export interface StoreProviderProps {
  children: ReactNode
  createStore: () => StoreApi<Stores>
}
