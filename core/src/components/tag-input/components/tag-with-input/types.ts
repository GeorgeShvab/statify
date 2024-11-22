import { ComponentProps } from "react"

export interface TagWithInputProps extends ComponentProps<"input"> {
  onRemove: () => void
}
