import { ComponentProps } from "react"

export interface SearchInputProps extends ComponentProps<"input"> {
  onClear?: () => void
  searchIcon?: boolean
  value: string
}
