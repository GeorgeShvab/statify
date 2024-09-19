import { ComponentProps, ReactNode } from "react"
import { InputProps } from "../input/Input"

export interface InputLabelProps extends ComponentProps<"div"> {
  children: ReactNode
  label: string
}
