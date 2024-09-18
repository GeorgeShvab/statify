import { ComponentProps } from "react"

export interface SwitchProps extends Omit<ComponentProps<"div">, "onChange"> {
  checked: boolean
  onChange: (checked: boolean) => void
}
