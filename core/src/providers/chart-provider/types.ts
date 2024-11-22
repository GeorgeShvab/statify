import { ReactNode } from "react"
import { ChartItem } from "@/store/chart-store/types"

export interface ChartProviderProps {
  children: ReactNode
  data?: ChartItem[]
}
