import { ReactNode } from "react"

export interface ModalProviderProps {
  children: ReactNode
}

export interface ModalContext {
  openModal: (element: ReactNode, config?: ModalConfiguration) => void
  closeModal: () => void
}

export interface ModalConfiguration {
  scrollable?: boolean
}
