import { ComponentProps } from "react"

export interface ChartTitleProps extends ComponentProps<"div"> {
  title: string
  subtitle: string
}
