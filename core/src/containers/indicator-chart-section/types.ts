import { ChartItem } from "@/store/chart-store/types"
import { Indicator } from "@/types/indicator.types"

export type ChartIndicatorData = Pick<Indicator, "unit" | "label">

export interface IndicatorChartSectionProps {
  data: ChartItem[]
  allData: ChartItem[]
  indicator: ChartIndicatorData
}
