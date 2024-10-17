import { ComponentProps, ReactNode } from "react"
import { Size } from "@/types/general.types"

export interface TableBodyCellProps extends ComponentProps<"td"> {
  children: ReactNode
  size?: Size
  semantic?: boolean
}
