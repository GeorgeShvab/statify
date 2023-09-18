import * as types from '@/types'
import IndicatorService from '@/services/IndicatorService'
import axios from 'axios'
import getFullCountryName from '@/utils/getFullCountryName'
import { Metadata } from 'next'

interface SearchParams {
  id: string
  country: string
}

async function IndicatorPage({ params }: types.PageProps<SearchParams>) {
  const indicatorPromise = IndicatorService.getById(params.id)

  const dataPromise = axios.get<types.IMFValuesResponse>(
    `https://www.imf.org/external/datamapper/api/v1/${params.id}/${params.country}`
  )

  const [{ data }, indicatorData] = await Promise.all([dataPromise, indicatorPromise])

  const country = JSON.parse(JSON.stringify(data.values[params.id][params.country]))

  const indicator = JSON.parse(JSON.stringify(indicatorData))

  return (
    <main className="mb-3 md:mb-5">
      <div className="min-h-[calc(100vh-var(--header-height))]">
        <div className="container mb-3 md:mb-5">
          <div className="px-4 py-3.5 md:px-7 md:py-6 rounded-lg bg-white border">
            <h1 className="text-2xl font-bold mb-6 md:mb-8">
              {indicator.label} - {getFullCountryName(params.country)}
            </h1>
            <p className="text-neutral-400 text-sm">Source: {indicator.source}</p>
            <p className="text-neutral-400 text-sm">Unit: {indicator.unit}</p>
            {indicator.description && indicator.description.trim() && (
              <p className="text-neutral-600 mt-3" dangerouslySetInnerHTML={{ __html: indicator.description }}></p>
            )}
          </div>
        </div>
        <div className="container">
          <div className="bg-white dark:bg-slate-800 rounded-lg border">
            <table className="table-auto w-full relative country-table">
              <thead>
                <tr className="">
                  <th className="sticky top-0 !border-b dark:border-slate-600 text-xs md:text-base font-medium py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-left bg-neutral-50">
                    {indicator.unit}
                  </th>
                  <th className="sticky top-0 !border-b dark:border-slate-600 text-xs md:text-base font-medium py-3 px-3 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-fit md:w-32">
                    Trend
                  </th>
                  <th className="sticky top-0 !border-b dark:border-slate-600 text-xs md:text-base font-medium py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-fit md:w-32">
                    Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(country).map((item) => (
                  <tr className="country-row">
                    <th className="border-b dark:border-slate-600 py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal dark:text-slate-200 text-left">
                      {country[item].toFixed(2)}
                    </th>
                    <th className="border-b dark:border-slate-600 py-3 px-3 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-fit md:w-32">
                      Trend
                    </th>
                    <th className="border-b dark:border-slate-600 py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-fit md:w-32">
                      {item}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export const generateMetadata = async ({ params }: types.PageProps<SearchParams>): Promise<Metadata> => {
  const indicator = await IndicatorService.getById(params.id)

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
