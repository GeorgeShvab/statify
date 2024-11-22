import { FC } from "react"
import { ModalCenterContainerProps } from "@/components/modal/components/modal-center-container/types"
import "@/components/modal/components/modal-center-container/styles.scss"

const ModalCenterContainer: FC<ModalCenterContainerProps> = ({
  children,
  onClose,
}) => {
  return (
    <div>
      <div className="modal-center-container__backdrope" onClick={onClose} />
      <div className="modal-center-container__content">{children}</div>
    </div>
  )
}

export default ModalCenterContainer
