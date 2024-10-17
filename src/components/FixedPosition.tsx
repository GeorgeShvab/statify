import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { SidePosition } from "@/components/absolute-position/AbsolutePosition.types"
import calculatePosition from "@/utils/calculate-position/calculatePosition"

interface Props {
  anchor: RefObject<HTMLElement>
  position: SidePosition
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

      const { left: x, top: y } = calculatePosition(
        anchorDomRect,
        elementDomRect,
        position
      )

      if (pos.x !== x || pos.y !== y) setPos({ x, y })
    }
  }, [])

  return (
    <div
      className="fixed"
      style={{ left: pos.x + "px", top: pos.y + "px" }}
      ref={containerRef}
    >
      {children}
    </div>
  )
}

export default FixedPosition
