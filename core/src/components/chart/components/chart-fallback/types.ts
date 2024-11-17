import { ComponentProps, ReactNode } from "react"

export interface ChartFallbackProps extends ComponentProps<"div"> {
  children: ReactNode
}
