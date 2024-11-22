import { DependencyList, ReactNode, RefObject } from "react"

export type SidePosition =
  | "top"
  | "top-start"
  | "top-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"

export interface AbsolutePositionProps {
  children: ReactNode
  dependenciesForRecalculation: DependencyList
  anchor: RefObject<HTMLElement>
  position: SidePosition
  offset?: number
}

export interface Position {
  top: number
  left: number
}
