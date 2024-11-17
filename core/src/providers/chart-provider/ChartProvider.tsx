import { createContext, FC, useContext, useRef } from "react"
import { StoreApi, useStore } from "zustand"
import { ChartProviderProps } from "@/providers/chart-provider/types"
import chartStore from "@/store/chart-store/chart-store"
import { ChartStore } from "@/store/chart-store/types"

const ChartContext = createContext<StoreApi<ChartStore>>(
  null as unknown as StoreApi<ChartStore>
)

const ChartProvider: FC<ChartProviderProps> = ({ children, data = [] }) => {
  const storeRef = useRef<StoreApi<ChartStore>>()

  if (!storeRef.current) {
    storeRef.current = chartStore(data)
  }

  return (
    <ChartContext.Provider value={storeRef.current}>
      {children}
    </ChartContext.Provider>
  )
}

export const useChartContext = () => {
  const store = useContext(ChartContext)

  if (!store) {
    throw new Error("useChartContext must be used within ChartProvider")
  }

  return useStore(store)
}

export default ChartProvider
