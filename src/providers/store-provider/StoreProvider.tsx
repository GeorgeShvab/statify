import { useRef, useContext, FC, createContext } from "react"
import { StoreApi, useStore } from "zustand"
import { StoreProviderProps, Stores } from "@/providers/store-provider/types"

const StoreContext = createContext<StoreApi<Stores>>({} as StoreApi<Stores>)

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  createStore,
}) => {
  const storeRef = useRef<StoreApi<Stores>>()

  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export const useContextStore = () => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error("useContextStore must be used within StoreProvider")
  }

  return useStore(store)
}
