import { ChartItem } from "@/containers/chart/types"

export interface ChartState {
  regions: ChartItem[]
  shortening: number
  selectedCount: number
}
