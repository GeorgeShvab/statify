import { Position, PositionOptions } from "@/types/types"
import calculatePosition from "@/utils/calculate-absolute-position/calculateAbsolutePosition"
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react"

interface Props {
  anchor: RefObject<HTMLElement>
  position: Position | PositionOptions
  children: ReactNode
}

interface PositionState {
  x?: number
  y?: number
}

const AbsolutePosition: FC<Props> = ({ anchor, children, position }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<PositionState>({})

  useEffect(() => {
    if (anchor.current && containerRef.current) {
      const anchorDomRect = anchor.current.getBoundingClientRect()
      const elementDomRect = containerRef.current.getBoundingClientRect()

      let { x, y } = calculatePosition(anchorDomRect, elementDomRect, position)

      x = x + window.scrollX
      y = y + window.scrollY

      if (pos.x !== x || pos.y !== y) setPos({ x, y })
    }
  }, [])

  return (
    <div
      className="absolute"
      style={{ left: pos.x + "px", top: pos.y + "px" }}
      ref={containerRef}
    >
      {children}
    </div>
  )
}

export default AbsolutePosition
