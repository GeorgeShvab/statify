import { ReactNode } from 'react'

export interface ModalProviderProps {
  children: ReactNode
}

export interface ModalContext {
  openModal: (config: ReactNode) => void
  closeModal: () => void
}
