import { ComponentProps, ReactNode } from "react"

export interface PageContentWrapperProps extends ComponentProps<"div"> {
  children: ReactNode
}
