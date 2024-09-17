import { Indicator } from "@prisma/client"
import { Value } from "@/types/types"

export interface IndicatorCountryTableProps {
  data: Value[]
  indicator: Indicator
}
