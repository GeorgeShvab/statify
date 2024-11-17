import { FC, useEffect, useRef } from "react"
import { DetectOutsideClickProps } from "@/components/detect-outside-click/DetectOutsideClick.types"
import cn from "@/utils/cn/cn"
import "@/components/detect-outside-click/styles.scss"

const DetectOutsideClick: FC<DetectOutsideClickProps> = ({
  children,
  ignore,
  onOutsideClick,
  isAbsolute = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div
      ref={containerRef}
      className={cn(isAbsolute && "outside-click-container")}
    >
      {children}
    </div>
  )
}

export default DetectOutsideClick
