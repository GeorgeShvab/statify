import { useRef, useContext, FC, createContext } from "react"
import { StoreApi, useStore } from "zustand"
import { selectableStore } from "@/store/selectable-store/selectable-store"
import { SelectableStore } from "@/store/selectable-store/types"
import { SelectableProviderProps } from "./types"

const SelectableContext = createContext<StoreApi<SelectableStore>>(
  {} as StoreApi<SelectableStore>
)

export const SelectableProvider: FC<SelectableProviderProps> = ({
  children,
}) => {
  const storeRef = useRef<StoreApi<SelectableStore>>()

  if (!storeRef.current) {
    storeRef.current = selectableStore()
  }

  return (
    <SelectableContext.Provider value={storeRef.current}>
      {children}
    </SelectableContext.Provider>
  )
}

export const useSelectable = () => {
  const store = useContext(SelectableContext)

  if (!store) {
    throw new Error("useSelectable must be used within SelectableProvider")
  }

  return useStore(store)
}