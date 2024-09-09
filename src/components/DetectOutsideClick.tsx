import useOutsideClick from "@/hooks/use-outside-click/useOutsideClick"
import { ReactNode, FC, useRef, RefObject } from "react"

interface Props {
  children: ReactNode
  exclude?: RefObject<HTMLElement>[] | RefObject<HTMLElement>
  onOutsideClick: (e: Event) => void
}

const DetectOutsideClick: FC<Props> = ({
  children,
  exclude,
  onOutsideClick,
}) => {
  const containerEl = useRef<HTMLDivElement>(null)

  useOutsideClick(onOutsideClick, [
    containerEl,
    ...(!exclude ? [] : Array.isArray(exclude) ? exclude : [exclude]),
  ])

  return <div ref={containerEl}>{children}</div>
}

export default DetectOutsideClick
