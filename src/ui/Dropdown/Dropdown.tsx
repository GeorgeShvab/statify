import AbsolutePosition from '@/components/AbsolutePosition'
import AnimationWrapper from '@/components/Animation/AnimationWrapper'
import OpacityAnimation from '@/components/Animation/OpacityAnimation'
import DetectOutsideClick from '@/components/DetectOutsideClick'
import { FC, ReactNode, RefObject } from 'react'
import DropdownContainer from '@/ui/Dropdown/DropdownContainer'
import { Position, PositionOptions } from '@/types'
import dynamic from 'next/dynamic'
import useOnScroll from '@/hooks/useOnScroll'

const Portal = dynamic(() => import('@/components/Portal'), { ssr: false })

interface Props {
  children: ReactNode | ReactNode[]
  anchor: RefObject<HTMLElement>
  isOpen: boolean
  renderHidden?: boolean
  position?: Position | PositionOptions
  onClose: () => void
  closeOnScroll?: boolean
}

const Dropdown: FC<Props> = ({
  children,
  anchor,
  isOpen,
  onClose,
  closeOnScroll,
  position = 'bottom-left',
  renderHidden = false
}) => {
  useOnScroll(() => closeOnScroll && onClose(), [closeOnScroll])

  return (
    <Portal>
      <AbsolutePosition anchor={anchor} position={position}>
        <AnimationWrapper open={isOpen} renderHidden={renderHidden}>
          <OpacityAnimation>
            <DetectOutsideClick onOutsideClick={onClose} exclude={anchor}>
              <DropdownContainer>{children}</DropdownContainer>
            </DetectOutsideClick>
          </OpacityAnimation>
        </AnimationWrapper>
      </AbsolutePosition>
    </Portal>
  )
}

export default Dropdown
