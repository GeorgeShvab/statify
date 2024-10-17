import { ComponentProps, ReactNode } from "react"
import { Size } from "@/types/general.types"

export interface DropdownItemProps extends ComponentProps<"li"> {
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  size?: Size
}
