import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import getFullCountryName from '@/utils/getFullCountryName'
import { Metadata } from 'next'
import Link from 'next/link'
import ValueService from '@/services/ValueService'
import dynamic from 'next/dynamic'
import Table from './Table'

const Chart = dynamic(() => import('./Chart'), { ssr: false })

interface SearchParams {
  id: string
  country: string
}

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const indicatorPromise = IndicatorService.get({ id: params.id })

  const valuesPromise = ValueService.get({
    indicator: params.id,
    country: params.country,
  })

  const [values, indicator] = await Promise.all([valuesPromise, indicatorPromise])

  if (!indicator) return null

  return (
    <main className="mb-3 md:mb-5">
      <div className="min-h-[calc(100vh-var(--header-height))]">
        <div className="container mb-3 md:mb-5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border">
            <h1 className="text-2xl font-bold mb-6 md:mb-8">
              {getFullCountryName(params.country)} - {indicator.label}
            </h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
            <p className="text-neutral-600 mt-2 text-sky-700 text-sm">
              <Link href={`/indicator/${params.id}`}>Global {indicator.label}</Link>
            </p>
          </div>
        </div>
        <div className="container mb-3 md:mb-5">
          <div className="px-2 pr-2.5 py-4 pt-6 md:pt-8 md:px-7 md:pr-7 md:py-6 rounded-lg bg-white border">
            <h4 className="mb-1 md:mb-3 text-center font-semibold text-sm md:text-lg">
              {indicator.label}, {indicator.unit}
            </h4>
            <div className="!h-[300px] md:!h-[480px] overflow-hidden">
              <Chart
                data={values.map((item) => item.value)}
                labels={values.map((item) => String(item.year))}
                legend={[getFullCountryName(params.country)]}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="bg-white dark:bg-slate-800 rounded-lg border">
            <Table data={values} indicator={indicator} />
          </div>
        </div>
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
    openGraph: {
      images: ['/favicon.png'],
      title: `${getFullCountryName(params.country)} - ${indicator.label}`,
      description: `Detaled data about ${indicator.label} in ${getFullCountryName(params.country)}`,
      type: 'website',
      url: `/indicator/${params.id}/${params.country}`,
    },
  }
}

export default IndicatorPage
