import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import Link from 'next/link'
import Table from '@/app/indicator/[id]/[country]/Table'
import CountryService from '@/services/CountryService'
import { notFound } from 'next/navigation'
import Chart from '@/app/indicator/[id]/[country]/Chart'
import IndicatorCard from '@/components/IndicatorCard/IndicatorCard'
import IndicatorOptionsButton from '@/components/IndicatorOptionsButton/IndicatorOptionsButton'
import axios from 'axios'

interface SearchParams {
  id: string
  country: string
}

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const indicatorPromise = IndicatorService.get({ id: params.id })

  const countryPromise = CountryService.getCountry({
    indicator: params.id,
    country: params.country
  })

  const relatedIndicatorsPromise = IndicatorService.getRelatedIndicators({
    id: params.id
  })

  const [country, indicator, relatedIndicators] = await Promise.all([
    countryPromise,
    indicatorPromise,
    relatedIndicatorsPromise
  ])

  if (!indicator || !country) {
    notFound()
  }

  return (
    <div>
      <div className='min-h-main-dynamic md:min-h-main'>
        <section className='container mb-2 md:mb-3.5'>
          <div className='px-4 py-3.5 pt-4.5 md:px-7 md:py-6 rounded-lg bg-white border relative'>
            <IndicatorOptionsButton
              indicatorId={indicator.id}
              countryId={country.id}
            />
            <h1 className='text-2xl font-bold mb-4 md:mb-5 pr-10'>
              {country.name} - {indicator.label}
            </h1>
            <p className='text-neutral-400 text-sm'>
              Source: {indicator.source}
            </p>
            <p className='text-neutral-400 text-sm'>Unit: {indicator.unit}</p>
            {indicator.description ? (
              <p
                className='text-neutral-600 mt-2'
                dangerouslySetInnerHTML={{ __html: indicator.description }}
              ></p>
            ) : null}
            <p className='mt-4 text-blue text-sm'>
              <Link href={`/indicator/${params.id}`}>
                Back to all countries
              </Link>
            </p>
          </div>
        </section>
        {indicator.showChart ? (
          <section>
            <Chart
              initial={[country.id]}
              indicator={indicator}
              country={country.id}
            />
          </section>
        ) : null}
        <section className='container'>
          <div className='bg-white rounded-lg border'>
            <Table data={country.values} indicator={indicator} />
          </div>
        </section>
        {relatedIndicators && relatedIndicators?.length ? (
          <section className='container mt-4 md:mt-5'>
            <div className=''>
              <h2 className='mb-2 md:mb-3 px-2 font-semibold'>
                Related indicators
              </h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
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

export const generateMetadata = async ({
  params
}: types.PageProps<SearchParams>): Promise<Metadata> => {
  const indicatorPromise = IndicatorService.get({ id: params.id })
  const countryPromise = CountryService.get({ id: params.country })

  const [indicator, country] = await Promise.all([
    indicatorPromise,
    countryPromise
  ])

  let ogImage = '/og.png'

  try {
    if (indicator && country) {
      await axios.head(
        `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/${country.id}.png`
      )

      ogImage = `${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/${country.id}.png`
    }
  } catch {}

  if (!indicator || !country) {
    return {
      title: 'Not Found',
      description: 'This page is not exist',
      themeColor: '#ffffff',
      openGraph: {
        images: [ogImage],
        title: 'Not Found',
        description: 'This page is not exist',
        type: 'website',
        url: '/'
      },
      twitter: {
        images: [ogImage],
        title: 'Statify',
        description: 'This page is not exist',
        card: 'summary_large_image',
        site: '@Zhorrrro'
      }
    }
  }

  return {
    title: `${indicator.label} in ${country.name}`,
    description: `Statistical data of the ${indicator.label} in ${country.name}. ${indicator.description}`,
    themeColor: '#ffffff',
    openGraph: {
      images: [ogImage],
      title: `${indicator.label} in ${country.name}`,
      description: `Statistical data of the ${indicator.label} in ${country.name}.`,
      type: 'website',
      url: `/indicator/${params.id}/${params.country}`
    },
    twitter: {
      images: [ogImage],
      title: `${indicator.label} in ${country.name}`,
      description: `Statistical data of the ${indicator.label} in ${country.name}.`,
      card: 'summary_large_image',
      site: '@Zhorrrro'
    },
    alternates: {
      canonical: `${process.env.SERVER_ADDRESS}/indicator/${params.id}/${params.country}`
    }
  }
}

export const dynamicParams = true
export const revalidate = 'force-cache'
export const dynamic = 'force-static'

export default IndicatorPage
