import { ComponentProps } from "react"
import { RowValue } from "@/types/value.types"

export interface IndicatorCountryTableRowProps extends ComponentProps<"tr"> {
  value: RowValue
  precition: number
}
