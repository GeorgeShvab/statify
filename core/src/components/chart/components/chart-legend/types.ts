import { ComponentProps } from "react"
import { ChartItem } from "@/store/chart-store/types"

export type ChartLegendItem = Pick<ChartItem, "id" | "color" | "name">

export interface ChartLegendProps extends ComponentProps<"div"> {
  items: ChartLegendItem[]
}
