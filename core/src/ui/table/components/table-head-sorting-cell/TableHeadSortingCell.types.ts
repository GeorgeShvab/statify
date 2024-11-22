import { ComponentProps, ReactNode } from "react"

export interface TableHeadSortingCellProps extends ComponentProps<"th"> {
  children: ReactNode
  direction: "asc" | "desc"
  isSelected: boolean
  onSortChange: () => void
  buttonProps?: ComponentProps<"button">
  semantic?: boolean
}
