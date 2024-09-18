import { Indicator } from "@prisma/client"

export interface IndicatorsDashboardTableProps {
  indicators: (Indicator & { datapoints: number })[]
}

export interface IndicatorsDashboardTableFormValues
  extends Record<`${number}.absolute` | `${number}.hidden`, number> {}
