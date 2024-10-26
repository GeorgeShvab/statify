import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { IndicatorPageProps } from "@/app/(public)/(with-toolbar)/indicator/[id]/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ChartLoader from "@/containers/chart/chart-loader/ChartLoader"
import IndicatorDetailsSection from "@/containers/indicator-details-section/IndicatorDetailsSection"
import IndicatorTable from "@/containers/indicator-table/IndicatorTable"
import RelatedIndicatorsSection from "@/containers/related-indicators-section/RelatedIndicatorsSection"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/indicator/[id]/metadata"
export { default as generateStaticParams } from "@/app/(public)/(with-toolbar)/indicator/[id]/generate-static-params"

const ChartSection = dynamic(
  () => import("@/containers/chart-section/ChartSection"),
  { ssr: false, loading: () => <ChartLoader /> }
)

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

  return (
    <>
      <IndicatorDetailsSection indicator={indicator} />
      {indicator.showChart && (
        <ChartSection indicator={indicator} data={chartData} />
      )}
      <IndicatorTable data={countries} indicator={indicator} />
      {!!relatedIndicators?.length && (
        <RelatedIndicatorsSection relatedIndicators={relatedIndicators} />
      )}
    </>
  )
}

export const revalidate = "force-cache"

export default IndicatorPage
