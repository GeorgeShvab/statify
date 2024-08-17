import { ChartItem, CountryWithValues } from '@/types'
import { ReactNode } from 'react'

export interface ChartContext {
  isLimitError: boolean
  //removeError: () => void
  data: ChartItem[]
  shortening: number
  //update: (data: Partial<ChartItem> & { id: string }) => void
  setColor(id: string, color: string): void
  selectRegion(region: string): void
  unselectRegion(region: string): void
  toggleRegionSelection(region: string): void
}

export interface ChartProviderProps {
  children: ReactNode
  regions: CountryWithValues[]
}
