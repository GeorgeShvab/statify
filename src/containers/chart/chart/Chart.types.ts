import { Indicator } from "@prisma/client"
import { CountryWithValues } from "@/types/country.types"

export interface ChartProps {
  indicator: Indicator
  data: CountryWithValues[]
}
