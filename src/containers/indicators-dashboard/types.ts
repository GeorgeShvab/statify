import { IndicatorWithDatapoints } from "@/types/types"

export interface IndicatorsDashboardProps {
  indicators: IndicatorWithDatapoints[]
  sort: string
  search: string
  status: string
  sortDirection: string
}
