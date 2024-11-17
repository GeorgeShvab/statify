export interface RangeSliderProps {
  range: number[]
  className?: string
  selectedRange: [number, number]
  handleSelectRange: (range: [number, number]) => void
}

export type Range = [number, number]
