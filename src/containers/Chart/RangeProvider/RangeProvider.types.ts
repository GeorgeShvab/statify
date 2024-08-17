import { ReactNode } from 'react'

export interface RangeContext {
  range: number[]
  selectedRange: [number, number]
  setRange: (range: number[]) => void
  setSelectedRange: (range: [number, number]) => void
}

export type RangeContextState = Pick<RangeContext, 'range' | 'selectedRange'>

export interface RangeProviderProps {
  children: ReactNode
}
