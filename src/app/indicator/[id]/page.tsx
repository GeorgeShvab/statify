import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import CountryService from '@/services/CountryService'
import Table from './Table'
import { notFound } from 'next/navigation'
import Chart from './Chart'
import IndicatorCard from '@/components/IndicatorCard/IndicatorCard'
import IndicatorOptionsButton from '@/components/IndicatorOptionsButton/IndicatorOptionsButton'
import axios from 'axios'

interface Params {
  id: string
}

interface SearchParams {
  chart_items: string
}

async function IndicatorPage({ params }: types.PageProps<Params, SearchParams>) {
  const indicatorPromise = IndicatorService.get({ id: params.id })

  const countriesPromise = CountryService.getCountriesValueByIndicator({ indicator: params.id })

  const relatedIndicatorsPromise = IndicatorService.getRelatedIndicators({ id: params.id })

  const [countries, indicator, relatedIndicators] = await Promise.all([
    countriesPromise,
    indicatorPromise,
    relatedIndicatorsPromise,
  ])

  if (!indicator) {
    notFound()
  }

  return (
    <div>
      <div className="min-h-main-dynamic md:min-h-main">
        <section className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 pt-4.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <IndicatorOptionsButton indicatorId={indicator.id} />
            <h1 className="text-2xl font-bold mb-4 md:mb-5 pr-10">{indicator.label}</h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-2" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
          </div>
        </section>
        {indicator.showChart ? (
          <section>
            <Chart indicator={indicator} />
          </section>
        ) : null}
        <section className="container">
          <div className="bg-white rounded-lg border">
            <Table data={countries} indicator={indicator} />
          </div>
        </section>
        {relatedIndicators && relatedIndicators?.length ? (
          <section className="container mt-4 md:mt-5">
            <div className="">
              <h2 className="mb-2 md:mb-3 px-2 font-semibold">Related indicators</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {relatedIndicators.map((item) => (
                <IndicatorCard key={item.id} {...item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

export const generateMetadata = async ({ params }: types.PageProps<Params>): Promise<Metadata> => {
  const indicator = await IndicatorService.get({ id: params.id })
  let ogImage = '/og.png'

  try {
    if (indicator) {
      await axios.head(`${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/WEOWORLD.png`)

      ogImage = `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/WEOWORLD.png`
    }
  } catch {}

  if (!indicator) {
    return {
      title: 'Not Found',
      description: 'This page is not exist',
      themeColor: '#ffffff',
      openGraph: {
        images: [ogImage],
        title: 'Not Found',
        description: 'This page is not exist',
        type: 'website',
        url: '/',
      },
      twitter: {
        images: [ogImage],
        title: 'Statify',
        description: 'This page is not exist',
        card: 'summary_large_image',
        site: '@Zhorrrro',
      },
    }
  }

  return {
    title: indicator.label,
    description: `Statistical data of ${indicator.label} by country. ${indicator.description}`,
    themeColor: '#ffffff',
    openGraph: {
      images: [ogImage],
      title: indicator.label,
      description: `Statistical data of ${indicator.label} by country.`,
      type: 'website',
      url: `/indicator/${params.id}`,
    },
    twitter: {
      images: [ogImage],
      title: indicator.label,
      description: `Statistical data of ${indicator.label} by country.`,
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export async function generateStaticParams() {
  const indicators = await IndicatorService.getAll()

  return indicators.map((indicator) => ({
    id: indicator.id,
  }))
}

export const revalidate = 'force-cache'

export default IndicatorPage
