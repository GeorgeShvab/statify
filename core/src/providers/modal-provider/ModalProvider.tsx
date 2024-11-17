"use client"

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  ModalConfiguration,
  ModalContext,
  ModalProviderProps,
} from "@/providers/modal-provider/ModalProvider.types"
import Modal from "@/components/modal/Modal"

const modalContext = createContext<ModalContext>({
  openModal: () => {},
  closeModal: () => {},
})

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [element, setElement] = useState<ReactNode>(null)
  const [configuration, setConfiguration] = useState<ModalConfiguration | null>(
    null
  )

  const openModal = (
    element: ReactNode,
    modalConfiguration?: ModalConfiguration
  ) => {
    setIsOpen(true)
    setElement(element)
    if (modalConfiguration) setConfiguration(modalConfiguration)
  }

  const closeModal = () => {
    setIsOpen(false)
    setConfiguration(null)
  }

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    []
  )

  return (
    <modalContext.Provider value={value}>
      <Modal opened={isOpen} onClose={closeModal} {...configuration}>
        {element}
      </Modal>
      {children}
    </modalContext.Provider>
  )
}

ModalProvider.displayName = "ModalProvider"

export const useModal = () => {
  const modalData = useContext(modalContext)

  if (!modalData) {
    throw new Error("useModal must be used within ModalProvider")
  }

  return modalData
}

export default ModalProvider
