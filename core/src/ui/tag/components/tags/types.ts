import { ComponentProps } from "react"

export interface TagsProps extends ComponentProps<"div"> {
  data: string[]
}
