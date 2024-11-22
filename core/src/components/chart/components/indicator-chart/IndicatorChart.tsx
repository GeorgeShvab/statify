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
} from "chart.js"
import { getInitialOptions } from "@/components/chart/components/indicator-chart/constants"
import { IndicatorChartProps } from "@/components/chart/components/indicator-chart/types"
import getChartData from "@/components/chart/components/indicator-chart/utils/get-chart-data/getChartData"
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
  const chartData = getChartData(range, selectedRange, data)

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
      data-testid="indicator-line-chart"
      {...props}
    />
  )
}

export default IndicatorChart
