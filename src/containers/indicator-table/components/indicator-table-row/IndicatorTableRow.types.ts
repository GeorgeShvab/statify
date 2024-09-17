import { CountryRowValue } from "@/types/types"
import { Indicator } from "@prisma/client"
import { ComponentProps } from "react"

export interface IndicatorTableRowProps extends ComponentProps<"tr"> {
  indicator: Indicator
  country: CountryRowValue
}
