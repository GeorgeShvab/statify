import { CountryWithValues } from "@/types/types"
import generateRandomColor from "@/utils/generate-random-color/generateRandomColor"
import { useMemo, useRef } from "react"

const worldId = "WEOWORLD"
const usaId = "USA"

const getDefaultInitialRegion = (regions: CountryWithValues[]) => {
  if (regions.length === 1) return regions[0].id

  const hasWordlData = regions.find(({ id }) => id === worldId)

  if (hasWordlData) return worldId

  return usaId
}

// I do not store state inside of params
// I use params just to save selected in url
// So if user shares url, other users will have the same items by that link
const useInitialState = (regions: CountryWithValues[]) => {
  const initialState = useMemo(() => {
    let paramsRegions = new URL(window.location.href).searchParams
      .get("chart_items")
      ?.split(",")

    const selectedIds = paramsRegions || [getDefaultInitialRegion(regions)]

    const selectedIdsSet = new Set(selectedIds)

    let largestValue = 0

    const initialRegions = regions.map((item) => {
      if (!selectedIdsSet.has(item.id)) return { ...item, isSelected: false }

      if (item.maxValue.value > largestValue) {
        largestValue = item.maxValue.value
      }

      return { ...item, isSelected: true, color: generateRandomColor() }
    })

    return {
      largestValue,
      regions: initialRegions,
      selectedCount: selectedIds.length,
      selectedIds: selectedIds,
    }
  }, [])

  return initialState
}

export default useInitialState
