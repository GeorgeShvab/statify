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
  shortening: number | null
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
    shortening: null,
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

      let greatest = 0

      setData((prev) => ({
        ...prev,
        selectedRange: range,
        regions: regions.map((item) => {
          const isSelected = initial.includes(item.id)
          if (isSelected) {
            item.values.forEach((item) => {
              if (Math.abs(item.value) > greatest) greatest = Math.abs(item.value)
            })
          }

          return {
            ...item,
            isSelected: isSelected,
            color: isSelected ? getColor() : undefined,
          }
        }),
        range,
        isLoading: false,
        shortening: getShortening(greatest),
      }))
    }
  }, [regions])

  return { data, remove, removeAll, removeError, setSelectedRange, add }
}

function getShortening(value: number) {
  if (value > 1000000000000) return 1000000000000
  if (value > 1000000000) return 1000000000
  if (value > 1000000) return 1000000
  if (value > 1000) return 1000
  return null
}

export default useChartState
