import AbsolutePosition from '@/components/AbsolutePosition'
import AnimationWrapper from '@/components/Animation/AnimationWrapper'
import OpacityAnimation from '@/components/Animation/OpacityAnimation'
import DetectOutsideClick from '@/components/DetectOutsideClick'
import { FC, ReactNode, RefObject } from 'react'
import DropdownContainer from './DropdownContainer'
import { Position, PositionOptions } from '@/types'

interface Props {
  children: ReactNode | ReactNode[]
  anchor: RefObject<HTMLElement>
  isOpen: boolean
  renderHidden?: boolean
  position?: Position | PositionOptions
  onClose: () => void
}

const Dropdown: FC<Props> = ({ children, anchor, isOpen, onClose, position = 'bottom-left', renderHidden = false }) => {
  return (
    <AbsolutePosition anchor={anchor} position={position}>
      <AnimationWrapper open={isOpen} renderHidden={renderHidden}>
        <OpacityAnimation>
          <DetectOutsideClick onOutsideClick={onClose} exclude={anchor}>
            <DropdownContainer>{children}</DropdownContainer>
          </DetectOutsideClick>
        </OpacityAnimation>
      </AnimationWrapper>
    </AbsolutePosition>
  )
}

export default Dropdown
