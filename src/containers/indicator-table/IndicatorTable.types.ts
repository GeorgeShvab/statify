import { CountryRowValue } from "@/types/types"
import { Indicator } from "@prisma/client"

export interface IndicatorTableProps {
  data: CountryRowValue[]
  indicator: Indicator
}
