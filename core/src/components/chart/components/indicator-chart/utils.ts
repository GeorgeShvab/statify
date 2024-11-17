import { ChartItem } from "@/store/chart-store/types"

const filterValues = (item: ChartItem, fullRange: number[], offset: number) => {
  const values = item.values

  const data = []

  let i = 0,
    j = 0

  while (i < fullRange.length) {
    if (fullRange[i] === values[j]?.year + offset) {
      data.push(values[j]?.value)
      i++
      j++
    } else {
      data.push(null)
      i++
    }
  }

  return data
}

export default filterValues
