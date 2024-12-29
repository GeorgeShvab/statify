import { FC } from "react"
import { ModalCenterContainerProps } from "@/components/modal/components/modal-center-container/types"
import "@/components/modal/components/modal-center-container/styles.scss"

const ModalCenterContainer: FC<ModalCenterContainerProps> = ({
  children,
  onClose,
}) => {
  return (
    <div>
      <div
        className="modal-center-container__backdrope"
        data-testid="modal-backdrop"
        onClick={onClose}
      />
      <div className="modal-center-container__content" data-testid="modal">
        {children}
      </div>
    </div>
  )
}

export default ModalCenterContainer
