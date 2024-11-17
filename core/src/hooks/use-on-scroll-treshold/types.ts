import { DependencyList } from "react"

export interface ScrollTresholdConfig {
  ms?: number
  treshold: number
  deps?: DependencyList
  callLastIgnored?: boolean
}
