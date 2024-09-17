import { ComponentProps, ReactNode } from "react"

export interface TableRowProps extends ComponentProps<"tr"> {
  children: ReactNode
}
