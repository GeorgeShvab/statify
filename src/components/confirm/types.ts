import { ConfirmSeverity } from "@/providers/confirm-provider/ConfirmProvider.types"

export interface ConfirmProps {
  title: string
  severity?: ConfirmSeverity
  subtitle?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}
