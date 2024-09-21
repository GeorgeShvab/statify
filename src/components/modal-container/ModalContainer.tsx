import { FC } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import { ModalContainerProps } from "@/components/modal-container/types"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import "@/components/modal-container/styles.scss"

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
