import * as types from "@/types"
import IndicatorService from "@/services/IndicatorService"
import { Metadata } from "next"
import CountryService from "@/services/CountryService"
import Table from "@/app/indicator/[id]/Table"
import { notFound } from "next/navigation"
import axios from "axios"
import RelatedIndicatorsSection from "@/containers/RelatedIndicatorsSection/RelatedIndicatorsSection"
import IndicatorDetailsSection from "@/containers/IndicatorDetailsSection/IndicatorDetailsSection"
import dynamic from "next/dynamic"
import ChartLoader from "@/containers/Chart/ChartLoader/ChartLoader"

const ChartSection = dynamic(
  () => import("@/containers/ChartSection/ChartSection"),
  { ssr: false, loading: () => <ChartLoader /> }
)

interface Params {
  id: string
}

interface SearchParams {
  chart_items: string
}

async function IndicatorPage({
  params,
}: types.PageProps<Params, SearchParams>) {
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
        <Table data={countries} indicator={indicator} />
        {!!relatedIndicators?.length && (
          <RelatedIndicatorsSection relatedIndicators={relatedIndicators} />
        )}
      </div>
    </div>
  )
}

export const generateMetadata = async ({
  params,
}: types.PageProps<Params>): Promise<Metadata> => {
  const indicator = await IndicatorService.get({ id: params.id })
  let ogImage = "/og.png"

  try {
    if (indicator) {
      await axios.head(
        `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/WEOWORLD.png`
      )

      ogImage = `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/WEOWORLD.png`
    }
  } catch {}

  if (!indicator) {
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
    title: indicator.label,
    description: `Statistical data of ${indicator.label} by country. ${indicator.description}`,
    themeColor: "#ffffff",
    openGraph: {
      images: [ogImage],
      title: indicator.label,
      description: `Statistical data of ${indicator.label} by country.`,
      type: "website",
      url: `/indicator/${params.id}`,
    },
    twitter: {
      images: [ogImage],
      title: indicator.label,
      description: `Statistical data of ${indicator.label} by country.`,
      card: "summary_large_image",
      site: "@Zhorrrro",
    },
    alternates: {
      canonical: `${process.env.SERVER_ADDRESS}/indicator/${params.id}`,
    },
  }
}

export async function generateStaticParams() {
  const indicators = await IndicatorService.getAll()

  return indicators.map((indicator) => ({
    id: indicator.id,
  }))
}

export const revalidate = "force-cache"

export default IndicatorPage
