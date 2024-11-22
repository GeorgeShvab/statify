import { FC } from "react"
import { ChartElementProps } from "@/containers/indicator-chart-section/components/chart-element/types"
import ChartFallback from "@/components/chart/components/chart-fallback/ChartFallback"
import IndicatorChart from "@/components/chart/components/indicator-chart/IndicatorChart"
import { isEmptyChartStore } from "@/store/chart-store/utils"

const ChartElement: FC<ChartElementProps> = ({ store }) => {
  if (isEmptyChartStore(store)) {
    return <ChartFallback>Please, select at least one country</ChartFallback>
  }

  if (store.selectedRange[0] === store.selectedRange[1]) {
    return <ChartFallback>Please, provide wider year range</ChartFallback>
  }

  return (
    <IndicatorChart
      data={store.data}
      range={store.range}
      selectedRange={store.selectedRange}
      shortening={store.shortening}
    />
  )
}

export default ChartElement
