import { ReactNode } from "react"
import { Size } from "@/types/types"

export interface ModalContainerProps {
  children: ReactNode
  title: string
  size?: Size
}
