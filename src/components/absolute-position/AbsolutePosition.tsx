import { FC, useLayoutEffect, useRef, useState } from "react"

import {
  Position,
  AbsolutePositionProps,
} from "@/components/absolute-position/AbsolutePosition.types"
import calculatePosition from "@/components/absolute-position/calculatePosition"

import "@/components/absolute-position/styles.scss"

const AbsolutePosition: FC<AbsolutePositionProps> = ({
  children,
  anchor,
  position,
  dependenciesForRecalculation = [],
  offset = 0,
}) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const [containerPosition, setPosition] = useState<Position>()

  useLayoutEffect(() => {
    if (anchor.current && containerEl.current) {
      const anchorPos = anchor.current.getBoundingClientRect()
      const containerPos = containerEl.current.getBoundingClientRect()

      const calculatedPos = calculatePosition(
        anchorPos,
        containerPos,
        position,
        offset
      )

      setPosition(calculatedPos)
    }
  }, dependenciesForRecalculation)

  return (
    <div
      className="absolute-position"
      style={{
        left: containerPosition?.left + "px",
        top: containerPosition?.top + "px",
      }}
      ref={containerEl}
    >
      {children}
    </div>
  )
}

export default AbsolutePosition
