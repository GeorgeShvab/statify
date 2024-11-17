import { ChartIndicatorData } from "@/containers/indicator-chart-section/types"
import { ChartItem } from "@/store/chart-store/types"

export interface IndicatorChartContainerProps {
  indicator: ChartIndicatorData
  data: ChartItem[]
}
