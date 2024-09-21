import { ComponentProps, ReactNode } from "react"

export interface InputLabelProps extends ComponentProps<"div"> {
  children: ReactNode
  label: string
}
