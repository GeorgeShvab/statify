import { Suspense } from "react"
import axios from "axios"
import { Metadata } from "next"
import dynamicImport from "next/dynamic"
import { notFound } from "next/navigation"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ChartLoader from "@/containers/chart/chart-loader/ChartLoader"
import IndicatorCountryTable from "@/containers/indicator-country-table/IndicatorCountryTable"
import IndicatorDetailsSection from "@/containers/indicator-details-section/IndicatorDetailsSection"
import RelatedIndicatorsSection from "@/containers/related-indicators-section/RelatedIndicatorsSection"
import * as types from "@/types/types"

const ChartSection = dynamicImport(
  () => import("@/containers/chart-section/ChartSection"),
  { ssr: false, loading: () => <ChartLoader /> }
)

interface SearchParams {
  id: string
  country: string
}

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const indicatorPromise = IndicatorService.get({ id: params.id })

  const countryPromise = CountryService.getCountry({
    indicator: params.id,
    country: params.country,
  })

  const relatedIndicatorsPromise = IndicatorService.getRelatedIndicators({
    id: params.id,
  })

  const [country, indicator, relatedIndicators] = await Promise.all([
    countryPromise,
    indicatorPromise,
    relatedIndicatorsPromise,
  ])

  if (!indicator || !country) {
    notFound()
  }

  return (
    <div>
      <div className="min-h-main-dynamic md:min-h-main">
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
      </div>
    </div>
  )
}

export const generateMetadata = async ({
  params,
}: types.PageProps<SearchParams>): Promise<Metadata> => {
  const indicatorPromise = IndicatorService.get({ id: params.id })
  const countryPromise = CountryService.get({ id: params.country })

  const [indicator, country] = await Promise.all([
    indicatorPromise,
    countryPromise,
  ])

  let ogImage = "/og.png"

  try {
    if (indicator && country) {
      await axios.head(
        `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/${country.id}.png`
      )

      ogImage = `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/${country.id}.png`
    }
  } catch {
    // Do nothing if such error occurs. It indicates that there is no image for this indicator. There is no sense of image for some indicators.
  }

  if (!indicator || !country) {
    return {
      title: "Not Found",
      description: "This page is not exist",
      themeColor: "#ffffff",
      openGraph: {
        images: [ogImage],
        title: "Not Found",
        description: "This page is not exist",
        type: "website",
        url: "/",
      },
      twitter: {
        images: [ogImage],
        title: "Statify",
        description: "This page is not exist",
        card: "summary_large_image",
        site: "@Zhorrrro",
      },
    }
  }

  return {
    title: `${indicator.label} in ${country.name}`,
    description: `Statistical data of the ${indicator.label} in ${country.name}. ${indicator.description}`,
    themeColor: "#ffffff",
    openGraph: {
      images: [ogImage],
      title: `${indicator.label} in ${country.name}`,
      description: `Statistical data of the ${indicator.label} in ${country.name}.`,
      type: "website",
      url: `/indicator/${params.id}/${params.country}`,
    },
    twitter: {
      images: [ogImage],
      title: `${indicator.label} in ${country.name}`,
      description: `Statistical data of the ${indicator.label} in ${country.name}.`,
      card: "summary_large_image",
      site: "@Zhorrrro",
    },
    alternates: {
      canonical: `${process.env.SERVER_ADDRESS}/indicator/${params.id}/${params.country}`,
    },
  }
}

export const dynamicParams = true
export const revalidate = "force-cache"
export const dynamic = "force-static"

export default IndicatorPage
