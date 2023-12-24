import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import CountryService from '@/services/CountryService'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'
import BookmarkService from '@/services/BookmarkService'
import { cookies } from 'next/headers'
import Table from './Table'
import { notFound } from 'next/navigation'
import prettifyValue from '@/utils/prettifyValue'
import Chart from './Chart'

interface Params {
  id: string
}

interface SearchParams {
  chart_items: string
}

async function IndicatorPage({ params, searchParams }: types.PageProps<Params, SearchParams>) {
  const client = cookies().get('client_id')?.value

  const indicatorPromise = IndicatorService.get({ id: params.id })

  const isBookmarkedPromise = client ? BookmarkService.getOne({ indicator: params.id, client }) : null

  const countriesPromise = CountryService.getCountriesValueByIndicator({ indicator: params.id })

  const [countries, indicator, isBookmarked] = await Promise.all([
    countriesPromise,
    indicatorPromise,
    isBookmarkedPromise,
  ])

  if (!indicator) {
    notFound()
  }

  const initialChartRegion = countries.find((item) => item.id === 'WEOWORLD') || countries[0]

  const initialChartItems = searchParams.chart_items || initialChartRegion.id

  return (
    <div>
      <div className="min-h-main-dynamic md:min-h-main">
        <section className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <BookmarkButton isBookmarked={!!isBookmarked} />
            <h1 className="text-2xl font-bold mb-6 md:mb-8 pr-10">{indicator.label}</h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-3" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
            {indicator.total && (
              <p className="mt-4 text-neutral-600 font-bold">
                {indicator.absolute ? 'World total:' : 'Average in the world:'}{' '}
                {prettifyValue(indicator.total, indicator.precision)} {indicator.unitSymbol}
              </p>
            )}
          </div>
        </section>
        <section>
          <Chart initial={initialChartItems.split(',')} indicator={indicator} />
        </section>
        <section className="container">
          <div className="bg-white rounded-lg border">
            <Table data={countries} indicator={indicator} />
          </div>
        </section>
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

export default IndicatorPage
