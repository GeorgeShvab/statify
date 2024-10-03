import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { IndicatorPageProps } from "@/app/(public)/indicator/[id]/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ChartLoader from "@/containers/chart/chart-loader/ChartLoader"
import IndicatorDetailsSection from "@/containers/indicator-details-section/IndicatorDetailsSection"
import IndicatorTable from "@/containers/indicator-table/IndicatorTable"
import RelatedIndicatorsSection from "@/containers/related-indicators-section/RelatedIndicatorsSection"

export { default as generateMetadata } from "@/app/(public)/indicator/[id]/metadata"
export { default as generateStaticParams } from "@/app/(public)/indicator/[id]/generate-static-params"

const ChartSection = dynamic(
  () => import("@/containers/chart-section/ChartSection"),
  { ssr: false, loading: () => <ChartLoader /> }
)

async function IndicatorPage({ params }: IndicatorPageProps) {
  const indicatorPromise = IndicatorService.get({ id: params.id })

  const countriesPromise = CountryService.getCountriesValueByIndicator({
    indicator: params.id,
  })

  const relatedIndicatorsPromise = IndicatorService.getRelatedIndicators({
    id: params.id,
  })

  const chartDataPromise = CountryService.getCountries({
    indicator: params.id,
  })

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
    <div>
      <div className="min-h-main-dynamic md:min-h-main">
        <IndicatorDetailsSection indicator={indicator} />
        {indicator.showChart && (
          <ChartSection indicator={indicator} data={chartData} />
        )}
        <IndicatorTable data={countries} indicator={indicator} />
        {!!relatedIndicators?.length && (
          <RelatedIndicatorsSection relatedIndicators={relatedIndicators} />
        )}
      </div>
    </div>
  )
}

export const revalidate = "force-cache"

export default IndicatorPage
