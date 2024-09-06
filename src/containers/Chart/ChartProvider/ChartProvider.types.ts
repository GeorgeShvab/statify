import { ChartItem, CountryWithValues } from '@/types'
import { ReactNode } from 'react'

export type ChartSelectedRange = [number, number]

export interface ChartContext {
  data: ChartItem[]
  shortening: number
  range: number[]
  selectedRange: ChartSelectedRange
  setColor(id: string, color: string): void
  selectRegion(region: string): void
  unselectRegion(region: string): void
  setRange: (range: number[]) => void
  setSelectedRange: (range: ChartSelectedRange) => void
}

export interface ChartProviderProps {
  children: ReactNode
  regions: CountryWithValues[]
}
