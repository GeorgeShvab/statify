import { ComponentProps, ReactNode } from "react"

export interface TableHeadCellProps extends ComponentProps<"th"> {
  children: ReactNode
}
