import { Indicator } from "@prisma/client"
import { ChartItem } from "@/store/chart-store/types"

export type ChartIndicatorData = Pick<Indicator, "unit" | "label">

export interface IndicatorChartSectionProps {
  data: ChartItem[]
  allData: ChartItem[]
  indicator: ChartIndicatorData
}
