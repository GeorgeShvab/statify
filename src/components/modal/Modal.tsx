import { FC, ReactNode, useEffect } from "react"
import dynamic from "next/dynamic"
import ModalScrollContainer from "./components/modal-scroll-container/ModalScrollContainer"
import ModalCenterContainer from "./components/modal-center-container/ModalCenterContainer"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

interface Props {
  children: ReactNode
  opened: boolean
  scrollable?: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, opened, scrollable, onClose }) => {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [opened])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Escape") return
      onClose()
    }

    window.addEventListener("keyup", handleKeyDown)

    return () => {
      window.removeEventListener("keyup", handleKeyDown)
    }
  }, [])

  const content = scrollable ? (
    <ModalScrollContainer onClose={onClose}>{children}</ModalScrollContainer>
  ) : (
    <ModalCenterContainer onClose={onClose}>{children}</ModalCenterContainer>
  )

  return <Portal>{opened && content}</Portal>
}

export default Modal
