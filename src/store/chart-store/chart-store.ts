import { createStore } from "zustand"
import { Range } from "@/components/chart/components/range-slider/types"
import {
  ChartItem,
  ChartStore,
  EmptyChartStoreData,
  NotEmptyChartItems,
} from "@/store/chart-store/types"
import getRange, { getMaxValue, getShortening } from "@/store/chart-store/utils"
import { chartColors } from "@/constants/general"

const emptyState: EmptyChartStoreData = {
  data: [],
  range: null,
  selectedRange: null,
  availableColors: chartColors,
  shortening: null,
}

const recalculateState = (
  data: NotEmptyChartItems,
  availableColors: string[]
) => {
  const range = getRange(data)
  const maxValue = getMaxValue(data)
  const shortening = getShortening(maxValue)
  const selectedRange: Range = [range[0], range[range.length - 1]]

  return { range, shortening, selectedRange, availableColors, data }
}

const chartStore = (initial: ChartItem[]) => {
  const initialColors = [...chartColors]

  const initialData = initial.map((item) => ({
    color: initialColors.shift(),
    ...item,
  })) as NotEmptyChartItems

  const initialState = recalculateState(initialData, initialColors)

  return createStore<ChartStore>()((set) => ({
    ...initialState,
    selectRange: (range) => set({ selectedRange: range }),
    add: (region) => {
      let isError = false

      set((state) => {
        if (state.data.length >= 15) {
          isError = true
          return state
        }

        const color = state.availableColors[0]
        const newRegion = { ...region, color }
        const nextData: NotEmptyChartItems = [...state.data, newRegion]
        const availableColors = state.availableColors.slice(1)

        return recalculateState(nextData, availableColors)
      })

      return isError
    },
    remove: (regionId) =>
      set((state) => {
        const { data, availableColors } = state

        const regionToRemove = data.find((item) => item.id === regionId)

        if (!regionToRemove) return state

        const nextData = data.filter((item) => item.id !== regionId)

        const colors = regionToRemove.color
          ? [regionToRemove.color, ...availableColors]
          : availableColors

        if (!nextData.length) return emptyState

        return recalculateState(nextData as NotEmptyChartItems, colors)
      }),
  }))
}

export default chartStore
