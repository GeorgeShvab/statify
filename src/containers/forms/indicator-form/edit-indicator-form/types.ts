import { Indicator } from "@prisma/client"

export interface EditIndicatorFormProps {
  indicator: Indicator
  onSuccess: () => void
}

export interface EditIndicatorFormValues {
  label: string
  description?: string
  source?: string
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
