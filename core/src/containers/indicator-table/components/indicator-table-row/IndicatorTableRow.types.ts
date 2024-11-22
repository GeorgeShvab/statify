import { ComponentProps } from "react"
import { Indicator } from "@prisma/client"
import { CountryRowValue } from "@/types/country.types"

export interface IndicatorTableRowProps extends ComponentProps<"tr"> {
  indicator: Indicator
  country: CountryRowValue
}
