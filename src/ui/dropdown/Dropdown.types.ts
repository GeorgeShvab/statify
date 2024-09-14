import { SidePosition } from "@/components/absolute-position/AbsolutePosition.types"
import { Size } from "@/types/types"
import { ComponentProps, ReactNode, RefObject } from "react"

export interface DropdownProps extends ComponentProps<"ul"> {
  anchor: RefObject<HTMLElement>
  children: ReactNode
  isOpen: boolean
  position: SidePosition
  onClose: () => void
}

export interface DropdownItemProps extends ComponentProps<"li"> {
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  size?: Size
}
