import AnimationWrapper from '@/components/Animation/AnimationWrapper'
import OpacityAnimation from '@/components/Animation/OpacityAnimation'
import DetectOutsideClick from '@/components/DetectOutsideClick'
import FixedPosition from '@/components/FixedPosition'
import Portal from '@/components/Portal'
import { Position, PositionOptions } from '@/types'
import { FC, ReactNode, RefObject } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
  anchor: RefObject<HTMLElement>
  isOpen: boolean
  renderHidden?: boolean
  position?: Position | PositionOptions
  onClose: () => void
}

const Popover: FC<Props> = ({ children, anchor, isOpen, onClose, renderHidden = false, position = 'bottom-left' }) => {
  return (
    <Portal>
      <FixedPosition position={position} anchor={anchor}>
        <AnimationWrapper open={isOpen} renderHidden={renderHidden}>
          <OpacityAnimation>
            <DetectOutsideClick exclude={anchor} onOutsideClick={onClose}>
              {children}
            </DetectOutsideClick>
          </OpacityAnimation>
        </AnimationWrapper>
      </FixedPosition>
    </Portal>
  )
}

export default Popover
