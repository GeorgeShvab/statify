import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import CountryService from '@/services/CountryService'
import Table from './Table'
import { notFound } from 'next/navigation'
import prettifyValue from '@/utils/prettifyValue'
import Chart from './Chart'
import IndicatorCard from '@/components/IndicatorCard/IndicatorCard'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'

interface Params {
  id: string
}

interface SearchParams {
  chart_items: string
}

async function IndicatorPage({ params, searchParams }: types.PageProps<Params, SearchParams>) {
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

  const initialChartRegion =
    countries.find((item) => item.id === 'WEOWORLD') ||
    countries.find((item) => item.id === 'USA') ||
    countries.find((item) => item.id === 'GBR') ||
    countries.find((item) => item.id === 'DEU') ||
    countries.find((item) => item.id === 'FRA') ||
    countries[0]

  const initialChartItems = searchParams.chart_items || initialChartRegion.id

  return (
    <div>
      <div className="min-h-main-dynamic md:min-h-main">
        <section className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <BookmarkButton indicatorId={indicator.id} />
            <h1 className="text-2xl font-bold mb-6 md:mb-8 pr-10">{indicator.label}</h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-3" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
            {indicator.total ? (
              <p className="mt-4 text-neutral-600 font-bold">
                {indicator.absolute ? 'World total:' : 'Average in the world:'}{' '}
                {prettifyValue(indicator.total, indicator.precision)} {indicator.unitSymbol}
              </p>
            ) : null}
          </div>
        </section>
        {indicator.showChart ? (
          <section>
            <Chart initial={initialChartItems.split(',')} indicator={indicator} />
          </section>
        ) : null}
        <section className="container">
          <div className="bg-white rounded-lg border">
            <Table data={countries} indicator={indicator} />
          </div>
        </section>
        {relatedIndicators && relatedIndicators?.length ? (
          <section className="container mt-3 md:mt-5">
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

  if (!indicator) {
    return {
      title: 'Not Found',
      description: 'This page is not exist',
      themeColor: '#ffffff',
      openGraph: {
        images: ['/og.png'],
        title: 'Not Found',
        description: 'This page is not exist',
        type: 'website',
        url: '/',
      },
      twitter: {
        images: ['/og.png'],
        title: 'Statify',
        description: 'This page is not exist',
        card: 'summary_large_image',
        site: '@Zhorrrro',
      },
    }
  }

  return {
    title: indicator.label,
    description: `Detaled data about ${indicator.label} in all countries`,
    themeColor: '#ffffff',
    openGraph: {
      images: ['/og.png'],
      title: indicator.label,
      description: `Detaled data about ${indicator.label} in all countries`,
      type: 'website',
      url: `/indicator/${params.id}`,
    },
    twitter: {
      images: ['/og.png'],
      title: 'Statify',
      description: 'Explore our database featuring 100+ indicators for hundreds of regions worldwide.',
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

export const dynamicParams = true

export default IndicatorPage
