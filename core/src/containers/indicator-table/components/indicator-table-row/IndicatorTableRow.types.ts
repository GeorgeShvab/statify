import { ComponentProps } from "react"
import { CountryRowValue } from "@/types/country.types"
import { Indicator } from "@/types/indicator.types"

export interface IndicatorTableRowProps extends ComponentProps<"tr"> {
  indicator: Indicator
  country: CountryRowValue
}
