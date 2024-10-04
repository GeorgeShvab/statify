import { ComponentProps, ReactNode } from "react"

export interface DataListItemProps extends ComponentProps<"div"> {
  label: ReactNode
  data: ReactNode
}
