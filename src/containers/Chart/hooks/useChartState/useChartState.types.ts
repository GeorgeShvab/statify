import { ChartItem } from '@/types'

export interface ChartState {
  isLimitError: boolean
  regions: ChartItem[]
  shortening: number
  selectedCount: number
}
