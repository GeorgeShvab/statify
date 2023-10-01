import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import getFullCountryName from '@/utils/getFullCountryName'
import { Metadata } from 'next'
import Link from 'next/link'
import Table from './Table'
import { ChartProvider } from '@/components/Chart/ChartContext'
import CountryService from '@/services/CountryService'
import { cookies } from 'next/headers'
import BookmarkService from '@/services/BookmarkService'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'
import dynamic from 'next/dynamic'
import AdvancedSearchBar from '@/components/SearchBar/AdvancedSearchBar'

interface SearchParams {
  id: string
  country: string
}

const Chart = dynamic(() => import('@/components/Chart/Chart'), { ssr: false })
const RangeSlider = dynamic(() => import('@/components/Chart/RangeSlider'), { ssr: false })

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const client = cookies().get('client_id')?.value

  const isBookmarkedPromise = client
    ? BookmarkService.getOne({ indicator: params.id, client, country: params.country })
    : null

  const indicatorPromise = IndicatorService.get({ id: params.id })

  const countryPromise = CountryService.getCountry({ indicator: params.id, country: params.country })

  const [country, indicator, isBookmarked] = await Promise.all([countryPromise, indicatorPromise, isBookmarkedPromise])

  if (!indicator) return null

  return (
    <main className="mb-3 md:mb-5">
      <div className="container">
        <div className="py-3 md:py-5">
          <AdvancedSearchBar />
        </div>
      </div>
      <div className="min-h-[calc(100vh-var(--header-height))]">
        <div className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <BookmarkButton isBookmarked={!!isBookmarked} />
            <h1 className="text-2xl font-bold mb-6 md:mb-8">
              {country.name} - {indicator.label}
            </h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
            <p className="mt-2 text-blue text-sm">
              <Link href={`/indicator/${params.id}`}>Global {indicator.label}</Link>
            </p>
          </div>
        </div>
        <ChartProvider initial={[country]} initialRange={country.values.map((item) => item.year)}>
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
            <div className="container">
              <div className="bg-white dark:bg-slate-800 rounded-lg border">
                <Table data={country.values} indicator={indicator} />
              </div>
            </div>
          </>
        </ChartProvider>
      </div>
    </main>
  )
}

export const generateMetadata = async ({ params }: types.PageProps<SearchParams>): Promise<Metadata> => {
  const indicator = await IndicatorService.get({ id: params.id })

  if (!indicator) return {}

  return {
    title: `${getFullCountryName(params.country)} - ${indicator.label}`,
    description: `Detaled data about ${indicator.label} in ${getFullCountryName(params.country)}`,
    themeColor: '#ffffff',
    openGraph: {
      images: ['/og.png'],
      title: `${getFullCountryName(params.country)} - ${indicator.label}`,
      description: `Detaled data about ${indicator.label} in ${getFullCountryName(params.country)}`,
      type: 'website',
      url: `/indicator/${params.id}/${params.country}`,
    },
    twitter: {
      images: ['/og.png'],
      title: 'Statify',
      description: 'Precious economic data by countries',
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export default IndicatorPage
