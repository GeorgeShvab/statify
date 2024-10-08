import { ComponentProps, ReactNode } from "react"
import { Size } from "@/types/types"

export interface TableHeadCellProps extends ComponentProps<"th"> {
  children: ReactNode
  size?: Size
  semantic?: boolean
}
