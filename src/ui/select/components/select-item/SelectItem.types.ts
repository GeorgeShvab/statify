import { ComponentProps } from "react"
import { Size } from "@/types/general.types"

export interface SelectItemProps extends ComponentProps<"li"> {
  size?: Size
  isSelected: boolean
}
