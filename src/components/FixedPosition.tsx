import { Position, PositionOptions } from '@/types'
import calculatePosition from '@/utils/calculateAbsolutePosition'
import dynamic from 'next/dynamic'
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react'

interface Props {
  anchor: RefObject<HTMLElement>
  position: Position | PositionOptions
  children: ReactNode
}

interface PositionState {
  x?: number
  y?: number
}

const FixedPosition: FC<Props> = ({ anchor, children, position }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<PositionState>({})

  useEffect(() => {
    if (anchor.current && containerRef.current) {
      const anchorDomRect = anchor.current.getBoundingClientRect()
      const elementDomRect = containerRef.current.getBoundingClientRect()

      let { x, y } = calculatePosition(anchorDomRect, elementDomRect, position)

      if (pos.x !== x || pos.y !== y) setPos({ x, y })
    }
  }, [])

  return (
    <div className="fixed" style={{ left: pos.x + 'px', top: pos.y + 'px' }} ref={containerRef}>
      {children}
    </div>
  )
}

export default FixedPosition
