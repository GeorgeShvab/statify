import { IndicatorWithDatapoints } from "@/types/types"

export interface IndicatorsDashboardTableProps {
  indicators: IndicatorWithDatapoints[]
}

export type IndicatorsDashboardTableFormValues = Record<
  `${number}.absolute` | `${number}.hidden`,
  number
>
