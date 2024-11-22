import { FC, MouseEvent, useRef } from "react"
import { ModalScrollContainerProps } from "@/components/modal/components/modal-scroll-container/types"
import "@/components/modal/components/modal-scroll-container/styles.scss"

const ModalScrollContainer: FC<ModalScrollContainerProps> = ({
  children,
  onClose,
}) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const handleWrapperClick = (e: MouseEvent) => {
    e.stopPropagation()

    containerEl.current?.click()
  }

  return (
    <div ref={containerEl}>
      <div className="modal-scroll-container" onClick={onClose}>
        <div onClick={handleWrapperClick}>{children}</div>
      </div>
    </div>
  )
}

export default ModalScrollContainer
