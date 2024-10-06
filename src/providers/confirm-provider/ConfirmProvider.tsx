"use client"

import { createContext, FC, useContext, useMemo, useState } from "react"
import Confirm from "@/components/confirm/Confirm"
import Modal from "@/components/modal/Modal"
import {
  ConfirmConfiguration,
  ConfirmContext,
  ConfirmProviderProps,
} from "@/providers/confirm-provider/ConfirmProvider.types"

const confirmContext = createContext<ConfirmContext>({
  openConfirm: () => {},
  closeConfirm: () => {},
})

const ConfirmProvider: FC<ConfirmProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [configuration, setConfiguration] = useState<ConfirmConfiguration>({
    title: "",
    severity: "info",
  })

  const openConfirm = (config: ConfirmConfiguration) => {
    setIsOpen(true)
    setConfiguration(config)
  }

  const closeConfirm = () => {
    setIsOpen(false)
  }

  const value = useMemo(
    () => ({
      openConfirm,
      closeConfirm,
    }),
    []
  )

  const handleCancel = () => {
    closeConfirm()
    if (configuration.onCancel) configuration.onCancel()
  }

  const handleConfirm = () => {
    closeConfirm()
    if (configuration.onConfirm) configuration.onConfirm()
  }

  return (
    <confirmContext.Provider value={value}>
      <Modal opened={isOpen} onClose={closeConfirm}>
        <Confirm
          {...configuration}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </Modal>
      {children}
    </confirmContext.Provider>
  )
}

ConfirmProvider.displayName = "ConfirmProvider"

export const useConfirm = () => {
  const confirmData = useContext(confirmContext)

  if (!confirmData) {
    throw new Error("useConfirm must be used within ConfirmProvider")
  }

  return confirmData
}

export default ConfirmProvider
