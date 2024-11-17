import { SidePosition } from "@/components/absolute-position/AbsolutePosition.types"
import { ComponentProps, ReactNode, RefObject } from "react"

export interface DropdownProps extends ComponentProps<"ul"> {
  anchor: RefObject<HTMLElement>
  children: ReactNode
  isOpen: boolean
  position: SidePosition
  closeOneClick?: boolean
  onClose: () => void
}
