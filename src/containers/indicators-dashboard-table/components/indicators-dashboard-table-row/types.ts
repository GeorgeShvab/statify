import { IndicatorWithDatapoints } from "@/types/types"

export interface IndicatorsDashboardTableRowProps {
  indicator: IndicatorWithDatapoints
  isSelected: boolean
  onSelect: (item: string) => void
}
