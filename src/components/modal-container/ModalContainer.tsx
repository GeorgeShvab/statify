import { FC } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import { ModalContainerProps } from "@/components/modal-container/types"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import cn from "@/utils/cn/cn"
import "@/components/modal-container/styles.scss"

const ModalContainer: FC<ModalContainerProps> = ({
  children,
  title,
  size = "medium",
}) => {
  const { closeModal } = useModal()

  return (
    <div className={cn("modal", size)}>
      <div className="modal__header">
        <h4 className="modal__header-title">{title}</h4>
        <IconButton
          className="modal__header-close-button"
          variant="text"
          color="light"
          onClick={closeModal}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </div>
  )
}

export default ModalContainer
