import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import CountryService from '@/services/CountryService'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'
import BookmarkService from '@/services/BookmarkService'
import { cookies } from 'next/headers'
import { ChartProvider } from '@/components/Chart/ChartContext'
import quickSort from '@/utils/quickSort'
import Table from './Table'
import dynamic from 'next/dynamic'

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

  const countriesPromise = CountryService.getCountries({ indicator: params.id })

  const [countries, indicator, isBookmarked] = await Promise.all([
    countriesPromise,
    indicatorPromise,
    isBookmarkedPromise,
  ])

  const initialChartRegion = countries.find((item) => item.id === 'WEOWORLD') || countries[0]

  const initialChartItems = searchParams.chart_items || initialChartRegion.id

  return (
    <main className="mb-3 md:mb-5">
      <div className="min-h-[calc(100vh-var(--header-height))]">
        <div className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <BookmarkButton isBookmarked={!!isBookmarked} />
            <h1 className="text-2xl font-bold mb-6 md:mb-8">{indicator.label}</h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>

            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-3" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
            {indicator.total && (
              <p className="font-semibold mt-4">
                Global:{' '}
                {(indicator.unitSymbol === 'bln'
                  ? Math.round(indicator.total * 1000000000)
                  : indicator.unitSymbol === 'mln'
                  ? Math.round(indicator.total * 1000000)
                  : indicator.total.toFixed(2)
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
              </p>
            )}
          </div>
        </div>
        <ChartProvider
          initial={countries.filter((item) => initialChartItems.split(',').includes(item.id))}
          initialRange={quickSort(
            Array.from(new Set(countries.map((item) => item.values.map((item) => item.year)).flat()))
          )}
        >
          <>
            <div className="container mb-2 md:mb-3.5">
              <div className="px-2 pr-3 py-4 pt-6 md:pt-7 md:px-7 md:pr-7 md:py-6 rounded-lg bg-white border">
                <h4 className="mb-1 md:mb-3 text-center font-semibold text-sm md:text-lg">
                  {indicator.label}, {indicator.unit}
                </h4>
                <div className="!min-h-[328px] md:!h-[520px] overflow-hidden">
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
            <div className="container mb-2 md:mb-3.5 overflow-hidden md:hidden">
              <div className="px-2 py-4 md:px-7 md:py-6 rounded-lg bg-white border">
                <p className="text-neutral-400 text-center text-xs">
                  Tap and hold on any of the rows to add or remove it from the chart
                </p>
              </div>
            </div>
            <div className="container">
              <div className="bg-white dark:bg-slate-800 rounded-lg border">
                <Table data={countries} indicator={indicator} />
              </div>
            </div>
          </>
        </ChartProvider>
      </div>
    </main>
  )
}

export const generateMetadata = async ({ params }: types.PageProps<Params>): Promise<Metadata> => {
  const indicator = await IndicatorService.get({ id: params.id })

  return {
    title: `${indicator.label}`,
    description: `Detaled data about ${indicator.label} in all countries`,
    openGraph: {
      images: ['/favicon.png'],
      title: `${indicator.label}`,
      description: `Detaled data about ${indicator.label} in all countries`,
      type: 'website',
      url: `/indicator/${params.id}`,
    },
  }
}

export default IndicatorPage
