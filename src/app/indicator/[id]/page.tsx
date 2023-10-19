import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import CountryService from '@/services/CountryService'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'
import BookmarkService from '@/services/BookmarkService'
import { cookies } from 'next/headers'
import { ChartProvider } from '@/components/Chart/ChartContext'
import Table from './Table'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import prettifyValue from '@/utils/prettifyValue'
import ManageRegionsButton from '@/components/Chart/ManageRegions/ManageRegionsButton'

interface Params {
  id: string
}

interface SearchParams {
  chart_items: string
}

const Chart = dynamic(() => import('@/components/Chart/Chart'), { ssr: false })
const RangeSlider = dynamic(() => import('@/components/Chart/RangeSlider'), { ssr: false })

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
              <p className="mt-4 text-neutral-600">
                {indicator.absolute ? 'World total:' : 'Average in the world:'} {prettifyValue(indicator.total)}{' '}
                {indicator.unitSymbol}
              </p>
            )}
          </div>
        </section>
        <ChartProvider initial={initialChartItems.split(',')} indicator={indicator.id}>
          <section>
            <div className="container mb-2 md:mb-3.5">
              <div className="px-2 pr-3 py-4 pt-5 md:pt-6 md:pt-7 md:px-7 md:pr-7 md:py-6 rounded-lg bg-white border relative">
                <div className="mb-4 md:mb-4 flex justify-center relative px-8">
                  <h2 className="text-center font-semibold text-sm md:text-lg">
                    {indicator.label}, {indicator.unit}
                  </h2>
                  <div className="absolute right-0 top-1/2 translate-y-[-50%]">
                    <ManageRegionsButton />
                  </div>
                </div>
                <div className="!min-h-[328px] md:!min-h-[520px] overflow-hidden">
                  <Chart />
                </div>
              </div>
            </div>
            <div className="container mb-2 md:mb-3.5 overflow-hidden">
              <div className="px-6 py-4 md:px-9 md:py-6 rounded-lg bg-white border">
                <div className="h-[32px] md:h-[30px]">
                  <RangeSlider />
                </div>
              </div>
            </div>
          </section>
        </ChartProvider>
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
      description: 'Accurate economic data by countries',
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export default IndicatorPage
