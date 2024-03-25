import { ChartItem } from '@/types'
import { useState } from 'react'
import useRegionsParams from './useRegionsParams'
import generateRandomColor from '@/utils/generateRandomColor'

interface State {
  isLimitError: boolean
  regions: ChartItem[]
  shortening: number
  selectedCount: number
}

// bug with shortening

const useChartState = (regions: ChartItem[]) => {
  const getInitialRegions = () => {
    let url = new URL(window.location.href)

    let paramsRegions = new URLSearchParams(url.search).get('chart_items')?.split(',')

    let initialRegionsIds = new Set()

    if (!paramsRegions || !paramsRegions[0]) {
      if (regions.length > 1) {
        const world = regions.find((item) => item.id === 'WEOWORLD')
        if (world) {
          initialRegionsIds.add(world.id)
        } else {
          initialRegionsIds.add('USA')
        }
      } else {
        initialRegionsIds.add(regions[0].id)
      }
    } else {
      paramsRegions.forEach((item) => initialRegionsIds.add(item))
    }

    const regs = regions.map((item) => ({
      ...item,
      isSelected: initialRegionsIds.has(item.id),
      color: initialRegionsIds.has(item.id) ? generateRandomColor() : undefined,
    }))

    const maxAbsValue = regs.reduce((acc, curr) => {
      if (!curr.isSelected) return acc
      const max = Math.abs(Math.max(...curr.values.map((item) => item.value)))
      return max > acc ? max : acc
    }, 0) // to get the largets value in the chart and then calculate the shortening

    return {
      isLimitError: false,
      regions: regs,
      shortening: getShortening(maxAbsValue),
      selectedCount: initialRegionsIds.size,
    }
  }

  const [data, setData] = useState<State>(getInitialRegions)

  useRegionsParams(data.regions)

  const update = (param: { id: string; color?: string; isSelected?: boolean }) => {
    if (param.isSelected && data.selectedCount > 14) {
      setData((prev) => ({ ...prev, isLimitError: true }))
    } else {
      const maxAbsValue = data.regions.reduce((acc, curr) => {
        if ((param.id === curr.id && !param.isSelected) || (!curr.isSelected && curr.id !== param.id)) return acc
        const max = Math.abs(Math.max(...curr.values.map((item) => item.value)))
        return max > acc ? max : acc
      }, 0) // to get the largets value in the chart and then calculate the shortening

      setData((prev) => ({
        ...prev,
        shortening: getShortening(maxAbsValue),
        selectedCount: prev.selectedCount + (param.isSelected ? 1 : param.isSelected === false ? -1 : 0),
        regions: prev.regions.map((item) =>
          item.id === param.id
            ? {
                ...item,
                ...param,
                color: param.color || item.color || generateRandomColor(),
              }
            : item
        ),
      }))
    }
  }

  const removeError = () => setData((prev) => ({ ...prev, isLimitError: false }))

  return { data, removeError, update }
}

function getShortening(value: number) {
  if (value > 1000000000000) return 1000000000000
  if (value > 1000000000) return 1000000000
  if (value > 1000000) return 1000000
  if (value > 1000) return 1000
  return 1
}

export default useChartState
