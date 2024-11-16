import { Range } from "@/components/chart/components/range-slider/types"
import { ChartItem } from "@/store/chart-store/types"

export interface IndicatorChartProps {
  data: ChartItem[]
  range: number[]
  shortening: number
  selectedRange: Range
  className?: string
}
