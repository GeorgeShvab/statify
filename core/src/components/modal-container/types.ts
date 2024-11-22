import { ReactNode } from "react"
import { Size } from "@/types/general.types"

export interface ModalContainerProps {
  children: ReactNode
  title: string
  size?: Size
  className?: string
  onClose?: () => void
}
