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
  ModalContext,
  ModalProviderProps,
} from "@/providers/modal-provider/ModalProvider.types"
import Modal from "@/components/Modal"

const modalContext = createContext<ModalContext>({
  openModal: () => {},
  closeModal: () => {},
})

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [element, setElement] = useState<ReactNode>(null)

  const openModal = (element: ReactNode) => {
    setIsOpen(true)
    setElement(element)
  }

  const closeModal = () => {
    setIsOpen(false)
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
      <Modal opened={isOpen} onClose={closeModal}>
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
