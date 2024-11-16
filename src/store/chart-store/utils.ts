import {
  ChartItem,
  ChartStore,
  EmptyChartStore,
} from "@/store/chart-store/types"

export const getRange = (items: ChartItem[]) => {
  const initialYear = items[0].values[0].year

  let min = initialYear,
    max = initialYear

  items.forEach((item) => {
    item.values.forEach((item) => {
      if (item.year > max || max === undefined) {
        max = item.year
      }

      if (item.year < min || min === undefined) {
        min = item.year
      }
    })
  })

  const result = []

  for (let i = min; i <= max; i++) {
    result.push(i)
  }

  return result
}

export const getMaxValue = (items: ChartItem[]) => {
  return Math.max(...items.map((item) => item.maxValue.value))
}

export default getRange

export function isEmptyChartStore(store: ChartStore): store is EmptyChartStore {
  return store.data.length === 0
}

export const getShortening = (value: number) => {
  if (value > 1000000000000) return 1000000000000
  if (value > 1000000000) return 1000000000
  if (value > 1000000) return 1000000
  if (value > 1000) return 1000
  return 1
}
