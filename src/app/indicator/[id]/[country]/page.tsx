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
import { notFound } from 'next/navigation'
import CopyChartButton from '@/components/Chart/CopyChartButton'

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

  if (!indicator || !country) {
    notFound()
  }

  return (
    <div>
      <div className="min-h-main-dynamic md:min-h-main">
        <section className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <BookmarkButton isBookmarked={!!isBookmarked} />
            <h1 className="text-2xl font-bold mb-6 md:mb-8 pr-10">
              {country.name} - {indicator.label}
            </h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && (
              <p className="text-neutral-600 mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
            <p className="mt-2 text-blue text-sm">
              <Link href={`/indicator/${params.id}`}>Global {indicator.label}</Link>
            </p>
          </div>
        </section>
        <ChartProvider initial={[country.id]} indicator={indicator.id} country={country.id}>
          <section>
            <div className="container mb-2 md:mb-3.5">
              <div className="px-2 pr-3 pt-4 pb-2 pt-5 md:pt-7 md:px-7 md:pb-3 rounded-lg bg-white border relative">
                <div className="mb-5 md:mb-4 flex justify-center relative px-8">
                  <div className="absolute right-0 top-1/2 translate-y-[-50%]">
                    <CopyChartButton />
                  </div>
                  <h2 className="text-center font-semibold text-sm md:text-lg">
                    {indicator.label}, {indicator.unit}
                  </h2>
                </div>
                <div className="!min-h-[336px] md:!min-h-[528px] overflow-hidden pb-2" id="chart">
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
            <Table data={country.values} indicator={indicator} />
          </div>
        </section>
      </div>
    </div>
  )
}

export const generateMetadata = async ({ params }: types.PageProps<SearchParams>): Promise<Metadata> => {
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
      description: 'Accurate economic data by countries',
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export default IndicatorPage
