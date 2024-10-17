import { ComponentProps } from "react"
import { Size } from "@/types/general.types"

export interface Option {
  value: string
  label: string
}

export interface SelectProps extends Omit<ComponentProps<"div">, "onChange"> {
  options: readonly Option[] | Option[]
  value: string
  size?: Size
  itemProps?: ComponentProps<"li">
  containerProps?: ComponentProps<"ul">
  onChange: (option: Option) => void
  renderItemLabel?: (option: Option) => string
  renderSelectedLabel?: (option: Option) => string
}
