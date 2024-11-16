import { FC } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ChartData,
} from "chart.js"
import { getInitialOptions } from "@/components/chart/components/indicator-chart/constants"
import { IndicatorChartProps } from "@/components/chart/components/indicator-chart/types"
import filterValues from "@/components/chart/components/indicator-chart/utils"
import { ChartItem } from "@/store/chart-store/types"
import cn from "@/utils/cn/cn"
import "@/components/chart/components/indicator-chart/styles.scss"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
)

const IndicatorChart: FC<IndicatorChartProps> = ({
  data,
  range,
  shortening,
  selectedRange,
  className,
  ...props
}) => {
  const finalRange = range.filter(
    (item) => item >= selectedRange[0] && item <= selectedRange[1]
  )

  const chartData: ChartData<"line", (number | null)[]> = {
    labels: finalRange,
    datasets: data.map((item: ChartItem) => {
      const values = filterValues(
        item,
        finalRange,
        range.indexOf(selectedRange[0])
      )

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

  const options = getInitialOptions((value: number) => {
    const label = shortening ? value / shortening : value
    if (label % 1 !== 0) return label.toFixed(1)
    return label
  })

  return (
    <Line
      data={chartData}
      options={options}
      className={cn("indicator-chart", className)}
      {...props}
    />
  )
}

export default IndicatorChart
