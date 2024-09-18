import { Indicator } from "@prisma/client"
import { ComponentProps } from "react"

export interface IndicatorsDashboardTableRowProps {
  indicator: Indicator & { datapoints: number }
}
