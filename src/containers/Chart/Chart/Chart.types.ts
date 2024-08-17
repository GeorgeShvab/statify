import { CountryRowValue, CountryWithValues } from '@/types'
import { Indicator } from '@prisma/client'

export interface ChartProps {
  indicator: Indicator
  data: CountryWithValues[]
}
