import { RowValue } from "@/types/value.types"

export type NotEmptyChartItems = [...ChartItem[], ChartItem]
export interface NotEMptyChartStore extends ChartStoreData {
  add: (region: ChartItem) => boolean
  remove: (region: string) => void
  selectRange: (range: [number, number]) => void
}

export interface EmptyChartStore extends EmptyChartStoreData {
  add: (region: ChartItem) => boolean
  remove: (region: string) => void
  selectRange: (range: [number, number]) => void
}

export interface ChartStoreData {
  availableColors: string[]
  data: NotEmptyChartItems
  range: number[]
  selectedRange: [number, number]
  shortening: number
}

export interface EmptyChartStoreData {
  availableColors: string[]
  data: []
  range: null
  selectedRange: null
  shortening: null
}

export interface ChartItem {
  id: string
  name: string
  color?: string
  values: RowValue[]
  maxValue: RowValue
}

export type ChartStore = NotEMptyChartStore | EmptyChartStore
