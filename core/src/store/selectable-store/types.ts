import { StoreApi } from "zustand"

export interface SelectableStore<TId extends number | string = string> {
  selectedCount: number
  selectedItems: TId[]
  select: (item: TId) => void
  clearSelection: () => void
}

export type SelectableApi = StoreApi<SelectableStore>
