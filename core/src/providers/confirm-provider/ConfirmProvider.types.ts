import { ReactNode } from "react"

export type ConfirmSeverity = "danger" | "info"

export interface ConfirmConfiguration {
  title: string
  subtitle?: string
  severity: ConfirmSeverity
  confirmText?: string
  cancelText?: string
  onConfirm?: () => Promise<void> | void
  onCancel?: () => Promise<void> | void
}

export interface ConfirmContext {
  openConfirm: (config: ConfirmConfiguration) => void
  closeConfirm: () => void
}

export interface ConfirmProviderProps {
  children: ReactNode
}
