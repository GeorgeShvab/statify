import { Indicator } from "@prisma/client"

export interface IndicatorsDashboardTableProps {
  indicators: (Indicator & { datapoints: number })[]
}

export type IndicatorsDashboardTableFormValues = Record<
  `${number}.absolute` | `${number}.hidden`,
  number
>
