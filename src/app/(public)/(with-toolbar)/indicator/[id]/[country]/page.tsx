import { Suspense } from "react"
import dynamicImport from "next/dynamic"
import { notFound } from "next/navigation"
import { IndicatorCountryPageProps } from "@/app/(public)/(with-toolbar)/indicator/[id]/[country]/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ChartLoader from "@/containers/chart/chart-loader/ChartLoader"
import IndicatorCountryTable from "@/containers/indicator-country-table/IndicatorCountryTable"
import IndicatorDetailsSection from "@/containers/indicator-details-section/IndicatorDetailsSection"
import RelatedIndicatorsSection from "@/containers/related-indicators-section/RelatedIndicatorsSection"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/indicator/[id]/[country]/metadata"

const ChartSection = dynamicImport(
  () => import("@/containers/chart-section/ChartSection"),
  { ssr: false, loading: () => <ChartLoader /> }
)

async function IndicatorPage({ params }: IndicatorCountryPageProps) {
  const indicatorPromise = IndicatorService.getById(params.id)

  const countryPromise = CountryService.getCountryTableValues(
    params.id,
    params.country
  )

  const relatedIndicatorsPromise = IndicatorService.getRelatedById(params.id)

  const [country, indicator, relatedIndicators] = await Promise.all([
    countryPromise,
    indicatorPromise,
    relatedIndicatorsPromise,
  ])

  if (!indicator || !country) {
    notFound()
  }

  return (
    <>
      <IndicatorDetailsSection indicator={indicator} country={country} />
      {indicator.showChart && (
        <Suspense fallback={<ChartLoader />}>
          <ChartSection indicator={indicator} data={[country]} />
        </Suspense>
      )}
      <IndicatorCountryTable data={country.values} indicator={indicator} />
      {!!relatedIndicators?.length && (
        <RelatedIndicatorsSection relatedIndicators={relatedIndicators} />
      )}
    </>
  )
}

export const dynamicParams = true
export const revalidate = "force-cache"
export const dynamic = "force-static"

export default IndicatorPage
