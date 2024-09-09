import { ChartItem } from "@/types/types"

const getYearsRange = (data: ChartItem[]) => {
  let min = data[0].values[0].year,
    max = data[0].values[data[0].values.length - 1].year

  data.forEach((item) => {
    if (item.isSelected) {
      item.values.forEach(({ year }) => {
        if (year < min) {
          min = year
        }

        if (year > max) {
          max = year
        }
      })
    }
  })

  const range: number[] = []

  for (let i = min; i <= max; i++) {
    range.push(i)
  }

  return range
}

export default getYearsRange
