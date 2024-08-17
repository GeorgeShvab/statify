import {
  FC,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { useChart } from '@/containers/Chart/ChartProvider/ChartProvider'
import {
  RangeContext,
  RangeContextState,
  RangeProviderProps
} from './RangeProvider.types'
import { ChartItem } from '@/types'

const rangeContext = createContext<RangeContext>({
  setRange: () => {},
  setSelectedRange: () => {},
  range: [],
  selectedRange: [0, 0]
})

const getInitialData = (data: ChartItem[]) => {
  const array = data.reduce<number[]>((acc, item) => {
    if (item.isSelected) {
      return [...acc, ...item.values.map((item) => item.year)]
    }

    return acc
  }, [])

  const max = Math.max(...array)
  const min = Math.min(...array)

  return {
    array,
    max,
    min
  }
}

const RangeProvider: FC<RangeProviderProps> = ({ children }) => {
  const { data } = useChart()

  const { array, max, min } = getInitialData(data)

  const range: number[] = []

  for (let i = min; i <= max; i++) {
    range.push(i)
  }

  const [state, setState] = useState<RangeContextState>({
    range: range,
    selectedRange: [range[0], range[range.length - 1]]
  })

  useEffect(() => {
    const array = data
      .filter((item) => item.isSelected)
      .map((item) => item.values.map((item) => item.year))
      .flat()

    if (array.length) {
      const max = Math.max(...array)
      const min = Math.min(...array)

      const range: number[] = []

      for (let i = min; i <= max; i++) {
        range.push(i)
      }

      let selectedMin =
        state.selectedRange[0] >= min ? state.selectedRange[0] : min
      let selectedMax =
        state.selectedRange[1] <= max ? state.selectedRange[1] : max

      if (selectedMin === state.range[0]) {
        selectedMin = range[0]
      }

      if (selectedMax === state.range[state.range.length - 1]) {
        selectedMax = range[range.length - 1]
      }

      setState((prev) => ({
        ...prev,
        range: range,
        selectedRange: [selectedMin, selectedMax]
      }))
    }
  }, [data])

  const setSelectedRange = (range: [number, number]) =>
    setState((prev) => ({ ...prev, selectedRange: range }))

  const setRange = (range: number[]) =>
    setState((prev) => ({ ...prev, range: range }))

  return (
    <rangeContext.Provider value={{ ...state, setRange, setSelectedRange }}>
      {children}
    </rangeContext.Provider>
  )
}

export default RangeProvider

export const useRange = () => {
  const data = useContext(rangeContext)

  return data
}
