import { Size } from "@/types/types"
import { ComponentProps } from "react"

export interface Option {
  value: string
  label: string
}

export interface SelectProps extends Omit<ComponentProps<"div">, "onChange"> {
  options: Option[]
  value: string
  size?: Size
  itemProps?: ComponentProps<"li">
  containerProps?: ComponentProps<"ul">
  onChange: (option: Option) => void
  renderItemLabel?: (option: Option) => string
  renderSelectedLabel?: (option: Option) => string
}
