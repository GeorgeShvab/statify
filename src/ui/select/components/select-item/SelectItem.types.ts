import { Size } from "@/types/types"
import { ComponentProps } from "react"

export interface SelectItemProps extends ComponentProps<"li"> {
  size?: Size
  isSelected: boolean
}
