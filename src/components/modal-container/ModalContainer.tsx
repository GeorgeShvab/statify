import { FC } from "react"
import { ModalContainerProps } from "./types"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import "./styles.scss"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const ModalContainer: FC<ModalContainerProps> = ({ children }) => {
  const { closeModal } = useModal()

  return (
    <div className="modal-container">
      <IconButton
        className="modal-container__close-button"
        variant="text"
        color="light"
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </div>
  )
}

export default ModalContainer
