import { ComponentProps, ReactNode } from "react"

export interface PageWrapperProps extends ComponentProps<"div"> {
  children: ReactNode
}
