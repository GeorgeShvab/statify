import { ReactNode, RefObject } from "react"

export interface DetectOutsideClickProps {
  children: ReactNode
  onOutsideClick: (e: MouseEvent) => void
  isAbsolute?: boolean
  ignore?: RefObject<HTMLElement>[] | RefObject<HTMLElement>
}
