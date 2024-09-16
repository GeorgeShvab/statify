import { Size } from "@/types/types"
import { ComponentProps, ReactNode } from "react"

export interface DropdownItemProps extends ComponentProps<"li"> {
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  size?: Size
}
