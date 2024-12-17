import { ConfirmSeverity } from "@/providers/confirm-provider/ConfirmProvider.types"

export interface ConfirmProps {
  title: string
  severity?: ConfirmSeverity
  subtitle?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => Promise<void> | void
  onCancel?: () => Promise<void> | void
}
