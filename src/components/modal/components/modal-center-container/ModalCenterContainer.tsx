import { FC } from "react"
import { ModalCenterContainerProps } from "@/components/modal/components/modal-center-container/types"

const ModalCenterContainer: FC<ModalCenterContainerProps> = ({
  children,
  onClose,
}) => {
  return (
    <div>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black/25 z-20"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30">
        {children}
      </div>
    </div>
  )
}

export default ModalCenterContainer
