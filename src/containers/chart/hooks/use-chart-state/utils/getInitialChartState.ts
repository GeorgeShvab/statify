import { CountryWithValues } from "@/types/types"
import getShortening from "@/containers/chart/hooks/use-chart-state/utils/getShortening"
import generateRandomColor from "@/utils/generate-random-color/generateRandomColor"

const getInitialChartState = (regions: CountryWithValues[]) => {
  let url = new URL(window.location.href)

  let paramsRegions = new URLSearchParams(url.search)
    .get("chart_items")
    ?.split(",")

  let initialRegionsIds = new Set()

  if (!paramsRegions || !paramsRegions[0]) {
    if (regions.length > 1) {
      const world = regions.find((item) => item.id === "WEOWORLD")
      if (world) {
        initialRegionsIds.add(world.id)
      } else {
        initialRegionsIds.add("USA")
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

export default getInitialChartState
