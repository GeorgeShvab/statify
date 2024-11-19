import { ChartData } from "chart.js"
import filterValues from "@/components/chart/components/indicator-chart/utils/filter-values/filterValues"
import { Range } from "@/components/chart/components/range-slider/types"
import { ChartItem } from "@/store/chart-store/types"

const getChartData = (
  range: number[],
  selectedRange: Range,
  data: ChartItem[]
) => {
  const finalRange = range.filter(
    (item) => item >= selectedRange[0] && item <= selectedRange[1]
  )

  const chartData: ChartData<"line", (number | null)[]> = {
    labels: finalRange,
    datasets: data.map((item: ChartItem) => {
      const values = filterValues(item, finalRange)

      const pointRadius = window.screen.width > 768 ? 2 : 0

      return {
        data: values,
        borderColor: item.color,
        fill: false,
        borderWidth: 1,
        pointRadius: pointRadius,
        pointHover: pointRadius,
        pointBackgroundColor: item.color,
      }
    }),
  }

  return chartData
}

export default getChartData
