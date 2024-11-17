import { FC, ReactNode, RefObject } from "react"
import dynamic from "next/dynamic"
import FixedPosition from "@/components/FixedPosition"
import { SidePosition } from "@/components/absolute-position/AbsolutePosition.types"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import useOnScroll from "@/hooks/use-on-scroll/useOnScroll"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

interface Props {
  children: ReactNode | ReactNode[]
  anchor: RefObject<HTMLElement>
  isOpen: boolean
  renderHidden?: boolean
  position?: SidePosition
  onClose: () => void
  closeOnScroll?: boolean
}

const Popover: FC<Props> = ({
  children,
  anchor,
  isOpen,
  onClose,
  closeOnScroll,
  position = "bottom-start",
}) => {
  useOnScroll(() => closeOnScroll && onClose(), [closeOnScroll])

  if (!isOpen) return null

  return (
    <Portal>
      <FixedPosition position={position} anchor={anchor}>
        <DetectOutsideClick ignore={anchor} onOutsideClick={onClose}>
          {children}
        </DetectOutsideClick>
      </FixedPosition>
    </Portal>
  )
}

export default Popover
