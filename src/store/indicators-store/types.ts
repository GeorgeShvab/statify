import { IndicatorWithDatapoints } from "@/types/types"

export interface IndicatorsStore {
  indicators: IndicatorWithDatapoints[]
  setIndicators: (indicators: IndicatorWithDatapoints[]) => void
  hideIndicators: (ids: string[]) => void
  exposeIndicators: (ids: string[]) => void
}
