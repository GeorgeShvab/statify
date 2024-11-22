import { ComponentProps, ReactNode } from "react"

export interface TagProps extends ComponentProps<"div"> {
  children: ReactNode
}
