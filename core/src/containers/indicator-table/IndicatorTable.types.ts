import { Indicator } from "@prisma/client"
import { CountryRowValue } from "@/types/country.types"

export interface IndicatorTableProps {
  data: CountryRowValue[]
  indicator: Indicator
}
