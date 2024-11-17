import { FC, MouseEvent, useRef } from "react"
import { ModalScrollContainerProps } from "@/components/modal/components/modal-scroll-container/types"

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
      <div
        className="fixed top-0 left-0 bottom-0 right-0 z-20 overflow-auto bg-black/25 py-20 flex flex-col items-center"
        onClick={onClose}
      >
        <div onClick={handleWrapperClick}>{children}</div>
      </div>
    </div>
  )
}

export default ModalScrollContainer
