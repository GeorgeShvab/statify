import { ComponentProps, ReactNode } from "react"

export interface TableBodyCellProps extends ComponentProps<"td"> {
  children: ReactNode
}
