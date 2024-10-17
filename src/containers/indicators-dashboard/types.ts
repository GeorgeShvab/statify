import { IndicatorWithDatapoints } from "@/types/indicator.types"

export interface IndicatorsDashboardProps {
  indicators: IndicatorWithDatapoints[]
  sort: string
  search: string
  status: string
  sortDirection: string
}
