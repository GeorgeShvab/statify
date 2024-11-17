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
  className,
  onClose,
}) => {
  const { closeModal } = useModal()

  const handleClose = () => {
    if (onClose) onClose()
    closeModal()
  }

  return (
    <div className={cn("modal", className, size)}>
      <div className="modal__header">
        <h4 className="modal__header-title">{title}</h4>
        <IconButton
          className="modal__header-close-button"
          variant="text"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </div>
  )
}

export default ModalContainer
