import { ComponentProps } from "react"

export interface ChartManagerModalRegionProps extends ComponentProps<"li"> {
  region: {
    name: string
    isSelected: boolean
  }
}
