import { ChartItem, CountryWithValues } from '@/types'
import { useMemo, useState } from 'react'
import useRegionsParams from '@/containers/Chart/hooks/useRegionsParams/useRegionsParams'
import generateRandomColor from '@/utils/generateRandomColor'
import getInitialChartState from './utils/getInitialChartState'
import getShortening from './utils/getShortening'

const MAX_SELECTED_COUNT = 15

const useChartState = (regions: CountryWithValues[]) => {
  const initial = useMemo(() => getInitialChartState(regions), [])

  const [data, setData] = useState<ChartItem[]>(initial.regions)
  const [largestValue, setLargestValue] = useState<number>(initial.shortening)
  const [selectedCount, setSelectedCount] = useState<number>(
    initial.selectedCount
  )
  const [isLimitError, setIsLimitError] = useState<boolean>(
    initial.isLimitError
  )

  const setColor = (id: string, color: string) => {
    const newState = data.map((item) =>
      item.id === id ? { ...item, color } : item
    )

    setData(newState)
  }

  const selectRegion = (id: string) => {
    if (selectedCount === MAX_SELECTED_COUNT) return

    let newLargestValue = 0

    const newState = data.map((item) => {
      if (item.maxValue.value > newLargestValue) {
        newLargestValue = item.maxValue.value
      }

      if (item.id !== id) return item

      return { ...item, isSelected: true, color: generateRandomColor() }
    })

    setData(newState)
    setSelectedCount((prev) => prev + 1)
    setLargestValue(newLargestValue)
  }

  const unselectRegion = (id: string) => {
    let newLargestValue = 0

    const newState = data.map((item) => {
      if (item.maxValue.value > newLargestValue) {
        newLargestValue = item.maxValue.value
      }

      if (item.id !== id) return item

      return { ...item, isSelected: false }
    })

    setData(newState)
    setSelectedCount((prev) => prev - 1)
    setLargestValue(newLargestValue)
  }

  const toggleRegionSelection = (id: string) => {
    let newRegionSelectionState: boolean = false
    let newLargestValue = 0

    const newState = data.map((item) => {
      if (item.maxValue.value > newLargestValue) {
        newLargestValue = item.maxValue.value
      }

      if (item.id === id) {
        newRegionSelectionState = !item.isSelected

        if (newRegionSelectionState && selectedCount === MAX_SELECTED_COUNT) {
          return item
        }

        return { ...item, isSelected: newRegionSelectionState }
      }

      return item
    })

    setData(newState)
    setLargestValue(newLargestValue)

    if (newRegionSelectionState && selectedCount === MAX_SELECTED_COUNT) {
      setIsLimitError(true)
    } else {
      setIsLimitError(false)
      setSelectedCount((prev) => prev + (newRegionSelectionState ? 1 : -1))
    }
  }

  useRegionsParams(data)

  return {
    data,
    setColor,
    selectRegion,
    unselectRegion,
    toggleRegionSelection,
    shortening: getShortening(largestValue),
    selectedCount,
    isLimitError
  }
}

export default useChartState
