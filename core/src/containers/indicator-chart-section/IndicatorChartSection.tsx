"use client"

import { FC } from "react"
import dynamic from "next/dynamic"
import IndicatorChartLoadingFallback from "@/containers/indicator-chart-section/components/indicator-chart-loading-fallback/IndicatorChartLoadingFallback"
import { IndicatorChartSectionProps } from "@/containers/indicator-chart-section/types"
import ChartProvider from "@/providers/chart-provider/ChartProvider"
import "@/containers/indicator-chart-section/styles.scss"

const IndicatorChartContainer = dynamic(
  () =>
    import(
      "@/containers/indicator-chart-section/components/indicator-chart-container/IndicatorChartContainer"
    ),
  { ssr: false, loading: () => <IndicatorChartLoadingFallback /> }
)

const IndicatorChartSection: FC<IndicatorChartSectionProps> = ({
  data,
  indicator,
  allData,
}) => {
  return (
    <section>
      <ChartProvider data={data}>
        <div className="indicator-chart-section">
          <IndicatorChartContainer data={allData} indicator={indicator} />
        </div>
      </ChartProvider>
    </section>
  )
}

export default IndicatorChartSection
