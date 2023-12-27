import { FC, ReactElement, createContext, useContext, useEffect, useState } from 'react'
import useChart from './ChartContext'

interface RangeContext {
  range: number[]
  selectedRange: [number, number]
  setRange: (range: number[]) => void
  setSelectedRange: (range: [number, number]) => void
}

interface RangeState {
  range: number[]
  selectedRange: [number, number]
}

const rangeContext = createContext<RangeContext>({
  setRange: () => {},
  setSelectedRange: () => {},
  range: [],
  selectedRange: [0, 0],
})

interface Props {
  children: ReactElement
}

export const RangeProvider: FC<Props> = ({ children }) => {
  const { regions } = useChart()

  const array = regions
    .filter((item) => item.isSelected)
    .map((item) => item.values.map((item) => item.year))
    .flat()

  const max = Math.max(...array)
  const min = Math.min(...array)

  const range: number[] = []

  for (let i = min; i <= max; i++) {
    range.push(i)
  }

  const [state, setState] = useState<RangeState>({
    range: range,
    selectedRange: [range[0], range[range.length - 1]],
  })

  useEffect(() => {
    const array = regions
      .filter((item) => item.isSelected)
      .map((item) => item.values.map((item) => item.year))
      .flat()

    const max = Math.max(...array)
    const min = Math.min(...array)

    const range: number[] = []

    for (let i = min; i <= max; i++) {
      range.push(i)
    }

    let selectedMin = state.selectedRange[0] >= min ? state.selectedRange[0] : min
    let selectedMax = state.selectedRange[1] <= max ? state.selectedRange[1] : max

    if (selectedMin === state.range[0]) {
      selectedMin = range[0]
    }

    if (selectedMax === state.range[state.range.length - 1]) {
      selectedMax = range[range.length - 1]
    }

    setState((prev) => ({
      ...prev,
      range: range,
      selectedRange: [selectedMin, selectedMax],
    }))
  }, [regions])

  const setSelectedRange = (range: [number, number]) => setState((prev) => ({ ...prev, selectedRange: range }))

  const setRange = (range: number[]) => setState((prev) => ({ ...prev, range: range }))

  return <rangeContext.Provider value={{ ...state, setRange, setSelectedRange }}>{children}</rangeContext.Provider>
}

export const useRange = () => {
  const data = useContext(rangeContext)

  return data
}
