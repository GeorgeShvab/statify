import { ChartItem } from '@/types'
import { useEffect, useState } from 'react'
import useColors from './useColors'
import { useRouter } from 'next/navigation'

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
    regions: regions,
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

  const add = (id: string | string[]) => {
    if (typeof id === 'object') {
      if (id.length > 14) id = id.slice(0, 15)
      if (data.regions.filter((item) => item.isSelected).length > 14) {
        setData((prev) => ({ ...prev, isError: true }))
      } else {
        setData((prev) => ({
          ...prev,
          regions: prev.regions.map((item) => ({
            ...item,
            isSelected: id.includes(item.id) ? true : item.isSelected,
            color: id.includes(item.id) ? getColor() : item.color,
          })),
        }))
      }
    } else {
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
    if (data.regions) {
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
    }
  }, [data.regions])

  const router = useRouter()

  useEffect(() => {
    if (regions.length) {
      let url = new URL(window.location.href)

      let params = new URLSearchParams(url.search)

      let initialRegions = params.get('chart_items')?.split(',')

      if (!initialRegions || !initialRegions[0]) {
        if (regions.length > 1) {
          const world = regions.find((item) => item.id === 'WEOWORLD')

          if (world) {
            initialRegions = [world.id]
          } else {
            initialRegions = ['USA']
          }
        } else {
          initialRegions = [regions[0].id]
        }
      }

      add(initialRegions)
    }
  }, [])

  useEffect(() => {
    if (regions.length) {
      let url = new URL(window.location.href)

      let params = new URLSearchParams(url.search)

      const chartItems = data.regions
        .filter((item) => item.isSelected)
        .map((item) => item.id)
        .sort()
        .join(',')

      params.set('chart_items', chartItems)

      router.replace('?' + params.toString(), { scroll: false })
    }
  }, [data.regions])

  return { data, remove, removeAll, removeError, add }
}

function getShortening(value: number) {
  if (value > 1000000000000) return 1000000000000
  if (value > 1000000000) return 1000000000
  if (value > 1000000) return 1000000
  if (value > 1000) return 1000
  return 1
}

export default useChartState
