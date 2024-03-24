import { Position, PositionOptions } from '@/types'
import calculatePosition from '@/utils/calculateAbsolutePosition'
import { FC, ReactNode, RefObject, useLayoutEffect, useRef } from 'react'
import Portal from './Portal'

interface Props {
  anchor: RefObject<HTMLElement>
  position: Position | PositionOptions
  children: ReactNode
}

const AbsolutePosition: FC<Props> = ({ anchor, children, position }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (containerRef.current && anchor.current) {
      const anchorDomRect = anchor.current.getBoundingClientRect()
      const elementDomRect = containerRef.current.getBoundingClientRect()

      const { x, y } = calculatePosition(anchorDomRect, elementDomRect, position)

      containerRef.current.style.left = `${x}px`
      containerRef.current.style.top = `${y}px`
    }
  }, [])

  return (
    <Portal>
      <div className="fixed" ref={containerRef}>
        {children}
      </div>
    </Portal>
  )
}

export default AbsolutePosition
