import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import getFullCountryName from '@/utils/getFullCountryName'
import { Metadata } from 'next'
import Link from 'next/link'
import Table from './Table'
import CountryService from '@/services/CountryService'
import { notFound } from 'next/navigation'
import Chart from './Chart'
import IndicatorCard from '@/components/IndicatorCard/IndicatorCard'
import BookmarkButton from '@/components/BookmarkButton/BookmarkButton'

interface SearchParams {
  id: string
  country: string
}

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const indicatorPromise = IndicatorService.get({ id: params.id })

  const countryPromise = CountryService.getCountry({ indicator: params.id, country: params.country })

  const relatedIndicatorsPromise = IndicatorService.getRelatedIndicators({ id: params.id })

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
        <section className="container mb-2 md:mb-3.5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border relative">
            <BookmarkButton indicatorId={indicator.id} countryId={country.id} />
            <h1 className="text-2xl font-bold mb-6 md:mb-8 pr-10">
              {country.name} - {indicator.label}
            </h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description ? (
              <p className="text-neutral-600 mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            ) : null}
            <p className="mt-2 text-blue text-sm">
              <Link href={`/indicator/${params.id}`}>Back to all countries</Link>
            </p>
          </div>
        </section>
        {indicator.showChart ? (
          <section>
            <Chart initial={[country.id]} indicator={indicator} country={country.id} />
          </section>
        ) : null}
        <section className="container">
          <div className="bg-white rounded-lg border">
            <Table data={country.values} indicator={indicator} />
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
      description: 'Explore our database featuring 100+ indicators for hundreds of regions worldwide.',
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export const dynamicParams = true
export const revalidate = 'force-cache'
export const dynamic = 'force-static'

export default IndicatorPage
