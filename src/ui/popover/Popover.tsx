import { FC, ReactNode, RefObject } from "react"
import dynamic from "next/dynamic"
import FixedPosition from "@/components/FixedPosition"
import AnimationWrapper from "@/components/animation/AnimationWrapper"
import OpacityAnimation from "@/components/animation/OpacityAnimation"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import useOnScroll from "@/hooks/use-on-scroll/useOnScroll"
import { Position, PositionOptions } from "@/types/types"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

interface Props {
  children: ReactNode | ReactNode[]
  anchor: RefObject<HTMLElement>
  isOpen: boolean
  renderHidden?: boolean
  position?: Position | PositionOptions
  onClose: () => void
  closeOnScroll?: boolean
}

const Popover: FC<Props> = ({
  children,
  anchor,
  isOpen,
  onClose,
  closeOnScroll,
  position = "bottom-left",
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
