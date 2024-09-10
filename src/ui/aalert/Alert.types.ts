import { ReactNode } from 'react'

export interface AlertProps {
  show: boolean
  text: ReactNode
  severity: AlertSeverity
}

export type AlertSeverity = 'danger' | 'success' | 'info'
