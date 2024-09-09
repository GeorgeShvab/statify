"use client"

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AlertConfig,
  AlertContext,
  AlertProviderProps,
} from "@/providers/alert-provider/AlertProvider.types"
import { AlertSeverity } from "@/ui/Alert/Alert.types"
import dynamic from "next/dynamic"

const ALERT_DEFAULT_DURATION = 5000

const Alert = dynamic(() => import("@/ui/Alert/Alert"), { ssr: false })

const alertContext = createContext<AlertContext>({
  openAlert: () => {},
  closeAlert: () => {},
})

const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const timeout = useRef<NodeJS.Timeout>()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [text, setText] = useState<ReactNode>(null)
  const [severity, setSeverity] = useState<AlertSeverity>("success")

  const openAlert = ({
    text,
    severity,
    duration = ALERT_DEFAULT_DURATION,
  }: AlertConfig) => {
    setIsOpen(true)
    setText(text)
    setSeverity(severity)

    clearTimeout(timeout.current)
    timeout.current = setTimeout(closeAlert, duration)
  }

  const closeAlert = () => {
    setIsOpen(false)
    clearTimeout(timeout.current)
  }

  const value = useMemo(
    () => ({
      openAlert,
      closeAlert,
    }),
    []
  )

  return (
    <>
      <Alert show={isOpen} severity={severity} text={text} />
      <alertContext.Provider value={value}>{children}</alertContext.Provider>
    </>
  )
}

export const useAlert = () => {
  const alertData = useContext(alertContext)

  if (!alertData) {
    throw new Error("useAlert must be used within AlertProvider")
  }

  return alertData
}

export default AlertProvider
