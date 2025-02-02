import { CountryRowValue } from "@/types/country.types"
import { Indicator } from "@/types/indicator.types"

export interface IndicatorTableProps {
  data: CountryRowValue[]
  indicator: Indicator
}
