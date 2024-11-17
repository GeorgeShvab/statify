import { ComponentProps } from "react"
import { Value } from "@prisma/client"

export interface ValuesDashboardTableRowProps extends ComponentProps<"tr"> {
  value: Value
}
