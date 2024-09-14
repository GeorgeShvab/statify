import AnimationWrapper from "@/components/animation/AnimationWrapper"
import OpacityAnimation from "@/components/animation/OpacityAnimation"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import FixedPosition from "@/components/FixedPosition"
import useOnScroll from "@/hooks/use-on-scroll/useOnScroll"
import { Position, PositionOptions } from "@/types/types"
import dynamic from "next/dynamic"
import { FC, ReactNode, RefObject } from "react"

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
  renderHidden = false,
  position = "bottom-left",
}) => {
  useOnScroll(() => closeOnScroll && onClose(), [closeOnScroll])

  return (
    <Portal>
      <AnimationWrapper open={isOpen} renderHidden={renderHidden}>
        <FixedPosition position={position} anchor={anchor}>
          <OpacityAnimation>
            <DetectOutsideClick ignore={anchor} onOutsideClick={onClose}>
              {children}
            </DetectOutsideClick>
          </OpacityAnimation>
        </FixedPosition>
      </AnimationWrapper>
    </Portal>
  )
}

export default Popover
