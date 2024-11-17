export interface IndicatorFormValues {
  label: string
  description?: string
  source: string
  dataset?: string
  unit?: string
  unitSymbol?: string
  precision: number
  ranking: number
  hidden: boolean
  showChart: boolean
  absolute: boolean
  searchTags?: string[]
}
