import { createStore } from "zustand"
import { SelectableStore } from "@/store/selectable-store/types"

export const selectableStore = () =>
  createStore<SelectableStore>()((set) => ({
    selectedCount: 0,
    selectedItems: [],
    select: (id) =>
      set((state) => {
        const isAlreadySelected = Boolean(
          state.selectedItems.find((item) => item === id)
        )

        const result = isAlreadySelected
          ? state.selectedItems.filter((item) => item !== id)
          : [...state.selectedItems, id]

        return {
          selectedCount: result.length,
          selectedItems: result,
        }
      }),
    clearSelection: () => set(() => ({ selectedItems: [], selectedCount: 0 })),
  }))
