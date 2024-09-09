import { AlertSeverity } from "@/ui/alert/Alert.types"
import { ReactNode } from "react"

export interface AlertProviderProps {
  children: ReactNode
}

export interface AlertContext {
  openAlert: (config: AlertConfig) => void
  closeAlert: () => void
}

export interface AlertConfig {
  text: string
  severity: AlertSeverity
  duration?: number
}
