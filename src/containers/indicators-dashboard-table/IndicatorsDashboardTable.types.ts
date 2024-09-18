import { Indicator } from "@prisma/client"

export interface IndicatorsDashboardTableProps {
  indicators: (Indicator & { datapoints: number })[]
}
