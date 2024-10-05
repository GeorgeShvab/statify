"use client"

import { createContext, FC, useMemo, useState } from "react"
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
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          {...configuration}
        />
      </Modal>
      {children}
    </confirmContext.Provider>
  )
}

export default ConfirmProvider
