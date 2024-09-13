import { ReactNode, RefObject } from "react"

export interface DetectOutsideClickProps {
  children: ReactNode
  onOutsideClick: (e: MouseEvent) => void
  ignore?: RefObject<HTMLElement>[] | RefObject<HTMLElement>
}
