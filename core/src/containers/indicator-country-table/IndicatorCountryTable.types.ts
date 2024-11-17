import { Indicator } from "@prisma/client"
import { RowValue } from "@/types/value.types"

export interface IndicatorCountryTableProps {
  data: RowValue[]
  indicator: Indicator
}
