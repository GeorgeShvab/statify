import { Indicator } from "@prisma/client"

export interface IndicatorsDashboardTableRowProps {
  indicator: Indicator & { datapoints: number }
}
