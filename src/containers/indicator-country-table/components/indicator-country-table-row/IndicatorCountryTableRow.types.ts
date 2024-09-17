import { Value } from "@/types/types"
import { ComponentProps } from "react"

export interface IndicatorCountryTableRowProps extends ComponentProps<"tr"> {
  value: Value
  precition: number
}
