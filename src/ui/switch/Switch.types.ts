import { ComponentProps } from "react"

export interface SwitchProps extends Omit<ComponentProps<"label">, "onChange"> {
  checked?: boolean
  inputProps?: ComponentProps<"input">
  onChange?: (checked: boolean) => void
}
