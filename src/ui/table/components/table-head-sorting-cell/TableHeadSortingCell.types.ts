import { ComponentProps, ReactNode } from "react"

export interface TableHeadSortingCellProps extends ComponentProps<"th"> {
  children: ReactNode
  direction: "asc" | "desc"
  isSelected: boolean
  buttonProps?: ComponentProps<"button">
  onSortChange: () => void
}
