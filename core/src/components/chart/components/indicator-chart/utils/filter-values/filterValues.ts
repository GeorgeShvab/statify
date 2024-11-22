import { ChartItem } from "@/store/chart-store/types"

const filterValues = (item: ChartItem, fullRange: number[]) => {
  const values = item.values

  const data = fullRange.map(
    (year) => values.find((value) => year === value.year)?.value ?? null
  )

  return data
}

export default filterValues
