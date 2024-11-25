import { ReactNode } from "react"

export type TableProps<T> = {
  renderHeader: () => ReactNode
  renderFooter?: () => ReactNode
  semantic?: boolean
} & (
  | {
      data: T[]
      renderRow: (data: T, index: number) => ReactNode
      children?: never
    }
  | { renderRow?: never; data?: never; children?: ReactNode }
)
