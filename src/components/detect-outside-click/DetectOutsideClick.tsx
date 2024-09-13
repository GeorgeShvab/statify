import { FC, useEffect, useRef } from "react"
import "@/components/detect-outside-click/styles.scss"

import { DetectOutsideClickProps } from "@/components/detect-outside-click/DetectOutsideClick.types"

const DetectOutsideClick: FC<DetectOutsideClickProps> = ({
  children,
  ignore,
  onOutsideClick,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const isInsideContainer = containerRef.current?.contains(
        e.target as HTMLElement
      )

      const isInsidePassedIgnore = Array.isArray(ignore)
        ? ignore?.some((item) =>
            item.current?.contains(e.target as HTMLElement)
          )
        : ignore?.current?.contains(e.target as HTMLElement)

      const shouldIgnore = isInsideContainer || isInsidePassedIgnore

      if (shouldIgnore) return

      onOutsideClick(e)
    }

    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <span ref={containerRef} className="outside-click-container">
      {children}
    </span>
  )
}

export default DetectOutsideClick
