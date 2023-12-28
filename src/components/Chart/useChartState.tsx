import { ChartItem } from '@/types'
import { useEffect, useState } from 'react'
import useColors from './useColors'

interface State {
  isError: boolean
  regions: ChartItem[]
  isLoading: boolean
  shortening: number | null
}

const useChartState = (regions: ChartItem[]) => {
  const { addColor, getColor, resetColors } = useColors()

  const [data, setData] = useState<State>(() => ({
    isError: false,
    regions: regions.map((item) => ({ ...item, color: item.isSelected && !item.color ? getColor() : undefined })),
    isLoading: true,
    shortening: null,
  }))

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

  useEffect(() => {
    const largest = data.regions
      .filter((item) => item.isSelected)
      .reduce(
        (acc, curr) =>
          Math.abs(Math.max(...curr.values.map((item) => item.value))) > acc
            ? Math.abs(Math.max(...curr.values.map((item) => item.value)))
            : acc,
        0
      )

    setData((prev) => ({ ...prev, shortening: getShortening(largest) }))
  }, [data.regions, regions])

  return { data, remove, removeAll, removeError, add }
}

function getShortening(value: number) {
  if (value > 1000000000000) return 1000000000000
  if (value > 1000000000) return 1000000000
  if (value > 1000000) return 1000000
  if (value > 1000) return 1000
  return null
}

export default useChartState
