import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import Link from 'next/link'
import { Metadata } from 'next'
import CountryService from '@/services/CountryService'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'
import BookmarkService from '@/services/BookmarkService'
import { cookies } from 'next/headers'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart'), { ssr: false })
const LineChart = dynamic(() => import('@/components/LineChart/LineChart'), { ssr: false })

interface SearchParams {
  id: string
}

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const client = cookies().get('client_id')?.value

  const indicatorPromise = IndicatorService.get({ id: params.id })

  const isBookmarkedPromise = client ? BookmarkService.getOne({ indicator: params.id, client }) : null

  const countriesPromise = CountryService.getCountries({ indicator: params.id })

  const [countries, indicator, isBookmarked] = await Promise.all([
    countriesPromise,
    indicatorPromise,
    isBookmarkedPromise,
  ])

  const world = countries.find((item) => item.id === 'WEOWORLD')

  return (
    <main className="mb-3 md:mb-5">
      <div className="min-h-[calc(100vh-var(--header-height))]">
        <div className="container mb-3 md:mb-5">
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
        {!!world?.values.length && (
          <div className="container mb-3 md:mb-5">
            <div className="px-2 pr-3 py-4 pt-6 md:pt-8 md:px-7 md:pr-7 md:py-6 rounded-lg bg-white border">
              <h4 className="mb-1 md:mb-3 text-center font-semibold text-sm md:text-lg">
                {indicator.label}, {indicator.unit}
              </h4>
              <div className="!h-[300px] md:!h-[480px]">
                <Chart
                  data={[world.values.map((item) => item.value)]}
                  labels={world.values.map((item) => String(item.year))}
                  legend={['World']}
                />
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="bg-white dark:bg-slate-800 rounded-lg border">
            <table className="table-auto w-full relative country-table">
              <thead>
                <tr className="">
                  <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-xs md:text-base font-bold py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-800 dark:text-slate-200 text-left w-24 md:w-[350px] bg-neutral-50">
                    Country
                  </th>
                  <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-medium py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-28 md:w-64">
                    {indicator.unit}
                  </th>
                  <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-medium py-4 md:py-3 px-2 md:px-3 md:pr-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-fit md:w-48 whitespace-nowrap">
                    Trend
                  </th>
                  <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-medium py-4 md:py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-fit md:w-[112px]">
                    Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {countries.map(
                  (item) =>
                    !!item.values.length && (
                      <tr className="country-row">
                        <td className="border-b dark:border-slate-600 text-[10px] md:text-base py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-gray-400 font-normal dark:text-slate-200 text-left w-24 md:w-[350px]">
                          <Link
                            href={`/indicator/${params.id}/${item.id}`}
                            className="hover:text-neutral-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="border-b dark:border-slate-600 py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-32 md:w-64">
                          {item.values[item.values.length - 1].value.toFixed(2)} {indicator.unitSymbol}
                        </td>
                        <td className="border-b dark:border-slate-600 px-1 px-2 md:px-3 md:pr-6 text-[10px] md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-fit md:w-48">
                          <div className="!w-20 !h-7 md:!w-24 md:!h-10">
                            <LineChart
                              data={
                                item.values
                                  .filter((item, index) => index % 2 === 0 || index === 0)
                                  .map((item) => item.value) as number[]
                              }
                            />
                          </div>
                        </td>
                        <td className="border-b dark:border-slate-600 py-4 md:py-3 px-2 md:px-3 pr-4 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-fit md:w-[112px]">
                          {item.values[item.values.length - 1].year}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export const generateMetadata = async ({ params }: types.PageProps<SearchParams>): Promise<Metadata> => {
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
