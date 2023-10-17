import { ChartItem } from '@/types'
import { useEffect, useState } from 'react'
import useColors from './useColors'
import quickSort from '@/utils/quickSort'
import useGetChartData from './useGetChartData'

interface State {
  isError: boolean
  range: number[]
  selectedRange: number[]
  regions: ChartItem[]
  isLoading: boolean
  colors: string[]
}

const chartColors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#1f11b4',
  '#ff1a0e',
  '#01a02c',
  '#002728',
  '#946711',
]

const useChartState = (initial: string[], indicator: string, country?: string) => {
  const { addColor, getColor, resetColors } = useColors()

  const [data, setData] = useState<State>({
    isError: false,
    selectedRange: [],
    range: [],
    regions: [],
    isLoading: true,
    colors: chartColors,
  })

  const remove = (id: string) => {
    setData((prev) => ({
      ...prev,
      regions: prev.regions.map((item) => {
        if (item.id === id) addColor(item.color as string)
        return {
          ...item,
          isSelected: item.id === id ? false : item.isSelected,
          color: item.id === id ? undefined : item.color,
        }
      }),
    }))
  }

  const add = (id: string) => {
    if (data.regions.filter((item) => item.isSelected).length > 14) {
      setData((prev) => ({ ...prev, isError: true }))
    } else {
      setData((prev) => ({
        ...prev,
        regions: prev.regions.map((item) => ({
          ...item,
          isSelected: item.id === id ? true : item.isSelected,
          color: item.id === id ? getColor() : item.color,
        })),
      }))
    }
  }

  const removeAll = () => {
    resetColors()
    setData((prev) => ({
      ...prev,
      regions: prev.regions.map((item) => ({ ...item, isSelected: false, color: undefined })),
    }))
  }

  const removeError = () => setData((prev) => ({ ...prev, isError: false }))

  const setSelectedRange = (selectedRange: number[]) => setData((prev) => ({ ...prev, selectedRange }))

  const regions = useGetChartData(indicator, country)

  useEffect(() => {
    if (regions) {
      const range = quickSort(Array.from(new Set(regions.map((item) => item.values.map((item) => item.year)).flat())))

      setData((prev) => ({
        ...prev,
        selectedRange: range,
        regions: regions.map((item) => ({
          ...item,
          isSelected: initial.includes(item.id),
          color: initial.includes(item.id) ? getColor() : undefined,
        })),
        range,
        isLoading: false,
      }))
    }
  }, [regions])

  return { data, remove, removeAll, removeError, setSelectedRange, add }
}

export default useChartState
