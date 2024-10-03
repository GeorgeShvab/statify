import { useRef, useContext, createContext, useEffect } from "react"
import { StoreApi, useStore } from "zustand"
import { StoreProviderProps, Stores } from "@/providers/store-provider/types"

const StoreContext = createContext<StoreApi<Stores>>({} as StoreApi<Stores>)

export const StoreProvider = <TStore extends Stores>({
  children,
  createStore,
  onUpdate,
  onUpdateDeps = [],
}: StoreProviderProps<TStore>) => {
  const storeRef = useRef<StoreApi<TStore>>()

  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  useEffect(() => {
    if (onUpdate) onUpdate(storeRef.current!)
  }, onUpdateDeps)

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export const useContextStore = <TStore extends StoreApi<Stores>>() => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error("useContextStore must be used within StoreProvider")
  }

  return useStore(store as TStore)
}
