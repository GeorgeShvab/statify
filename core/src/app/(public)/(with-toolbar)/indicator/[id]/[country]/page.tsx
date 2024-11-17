import { notFound } from "next/navigation"
import { IndicatorCountryPageProps } from "@/app/(public)/(with-toolbar)/indicator/[id]/[country]/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import PageContentWrapper from "@/layout/page-content-wrapper/PageContentWrapper"
import IndicatorChartSection from "@/containers/indicator-chart-section/IndicatorChartSection"
import IndicatorCountryTable from "@/containers/indicator-country-table/IndicatorCountryTable"
import IndicatorDetailsSection from "@/containers/indicator-details-section/IndicatorDetailsSection"
import RelatedIndicatorsSection from "@/containers/related-indicators-section/RelatedIndicatorsSection"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/indicator/[id]/[country]/metadata"

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
    <PageContentWrapper>
      <IndicatorDetailsSection indicator={indicator} country={country} />
      {indicator.showChart && (
        <IndicatorChartSection
          allData={[country]}
          indicator={indicator}
          data={[country]}
        />
      )}
      <IndicatorCountryTable data={country.values} indicator={indicator} />
      {!!relatedIndicators?.length && (
        <RelatedIndicatorsSection relatedIndicators={relatedIndicators} />
      )}
    </PageContentWrapper>
  )
}

export const dynamicParams = true
export const revalidate = "force-cache"
export const dynamic = "force-static"

export default IndicatorPage
