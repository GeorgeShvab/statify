import { notFound } from "next/navigation"
import { IndicatorPageProps } from "@/app/(public)/(with-toolbar)/indicator/[id]/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import PageContentWrapper from "@/layout/page-content-wrapper/PageContentWrapper"
import IndicatorChartSection from "@/containers/indicator-chart-section/IndicatorChartSection"
import IndicatorDetailsSection from "@/containers/indicator-details-section/IndicatorDetailsSection"
import IndicatorTable from "@/containers/indicator-table/IndicatorTable"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import { CountryWithValues } from "@/types/country.types"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/indicator/[id]/metadata"
export { default as generateStaticParams } from "@/app/(public)/(with-toolbar)/indicator/[id]/generate-static-params"

const initialDataId = "WEOWORLD"

const getInitialChartItem = (chartData: CountryWithValues[]) => {
  const worldData = chartData.find((item) => item.id === initialDataId)
  if (worldData) return worldData

  const usaData = chartData.find((item) => item.id === initialDataId)
  if (usaData) return usaData

  return chartData[0]
}

async function IndicatorPage({ params }: IndicatorPageProps) {
  const indicatorPromise = IndicatorService.getById(params.id)

  const countriesPromise = CountryService.getIndicatorTableValues(params.id)

  const relatedIndicatorsPromise = IndicatorService.getRelatedById(params.id)

  const chartDataPromise = CountryService.getManyWithValuesByIndicator(
    params.id
  )

  const [countries, indicator, relatedIndicators, chartData] =
    await Promise.all([
      countriesPromise,
      indicatorPromise,
      relatedIndicatorsPromise,
      chartDataPromise,
    ])

  if (!indicator) {
    notFound()
  }

  const initialChartData = getInitialChartItem(chartData)

  return (
    <PageContentWrapper>
      <IndicatorDetailsSection indicator={indicator} />
      {indicator.showChart && (
        <IndicatorChartSection
          allData={chartData}
          indicator={indicator}
          data={[initialChartData]}
        />
      )}
      <IndicatorTable data={countries} indicator={indicator} />
      {!!relatedIndicators?.length && (
        <IndicatorsListView
          entirePageHeight={false}
          text="Related indicators"
          data={relatedIndicators}
        />
      )}
    </PageContentWrapper>
  )
}

export const revalidate = "force-cache"

export default IndicatorPage
