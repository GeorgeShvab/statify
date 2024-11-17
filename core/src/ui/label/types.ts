import { ComponentProps, ReactNode } from "react"

export interface LabelProps extends ComponentProps<"div"> {
  children: ReactNode
  label: string
}
