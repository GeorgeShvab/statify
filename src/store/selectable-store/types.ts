import { StoreApi } from "zustand"

export interface SelectableStore {
  selectedCount: number
  selectedItems: string[]
  select: (item: string) => void
  clearSelection: () => void
}

export type SelectableApi = StoreApi<SelectableStore>
