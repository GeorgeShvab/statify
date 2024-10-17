import { IndicatorWithDatapoints } from "@/types/indicator.types"

export interface IndicatorsStore {
  indicators: IndicatorWithDatapoints[]
  setIndicators: (indicators: IndicatorWithDatapoints[]) => void
  hideIndicators: (ids: string[]) => void
  exposeIndicators: (ids: string[]) => void
  updateIndicator: (
    country: Partial<IndicatorWithDatapoints> &
      Pick<IndicatorWithDatapoints, "id">
  ) => void
  deleteIndicators: (id: string[]) => void
  backupData: IndicatorWithDatapoints[]
  backup: () => void
  revert: () => void
}
