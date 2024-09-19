import { ComponentProps } from "react"

export interface SwitchProps extends ComponentProps<"input"> {
  labelProps?: ComponentProps<"label">
}
