'use client'

import { Indicator, Country, Value } from '@/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, memo, useState } from 'react'

const LineChart = dynamic(() => import('@/components/LineChart/LineChart'), { ssr: false })

interface Props {
  data: (Country & { values: Value[]; name: string | null })[]
  indicator: Indicator
}

interface State {
  data: (Country & { values: Value[] })[]
  order: 'asc' | 'desc'
  by?: 'country' | 'value'
}

const Row: FC<{ indicator: Indicator; country: Country & { values: Value[] } }> = memo(({ indicator, country }) => {
  return (
    <tr className="country-row">
      <td className="border-b dark:border-slate-600 text-[10px] md:text-base py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-gray-400 font-normal dark:text-slate-200 text-left w-24 md:w-[350px]">
        <Link href={`/indicator/${indicator.id}/${country.id}`} className="hover:text-neutral-600 transition-colors">
          {country.name}
        </Link>
      </td>
      <td className="border-b dark:border-slate-600 py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-32 md:w-64">
        {country.values[country.values.length - 1].value.toFixed(2)} {indicator.unitSymbol}
      </td>
      <td className="border-b dark:border-slate-600 text-[10px] md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-[100px] md:w-48">
        <div className="w-full flex justify-center">
          <LineChart
            data={
              country.values
                .filter((item, index) => index % 2 === 0 || index === 0)
                .map((item) => item.value) as number[]
            }
          />
        </div>
      </td>
      <td className="border-b dark:border-slate-600 py-4 md:py-3 px-2 md:px-3 pr-4 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-[5px] md:w-[75px]">
        {country.values[country.values.length - 1].year}
      </td>
    </tr>
  )
})

const Table: FC<Props> = (props) => {
  const [data, setData] = useState<State>({
    data: props.data as (Country & { values: Value[] })[],
    order: 'asc',
    by: 'country',
  })

  const handleSort = (by: 'country' | 'value') => {
    if (by === 'country') {
      setData((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'country' ? 'desc' : 'asc',
        by: 'country',
        data: prev.data.sort((a, b) => {
          if ((a.name || '') > (b.name || '')) return prev.order === 'asc' && prev.by === 'country' ? -1 : 1
          if ((a.name || '') < (b.name || '')) return prev.order === 'asc' && prev.by === 'country' ? 1 : -1
          return 0
        }),
      }))
    } else {
      setData((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc',
        by: 'value',
        data: prev.data.sort((a, b) => {
          if (a.values[a.values.length - 1].value > b.values[b.values.length - 1].value) {
            return prev.order === 'asc' && prev.by === 'value' ? -1 : 1
          }
          if (a.values[a.values.length - 1].value < b.values[b.values.length - 1].value) {
            return prev.order === 'asc' && prev.by === 'value' ? 1 : -1
          }
          return 0
        }),
      }))
    }
  }

  return (
    <table className="table-auto w-full relative country-table">
      <thead>
        <tr className="">
          <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-bold py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-left w-24 md:w-[350px] bg-neutral-50">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-start"
              onClick={() => handleSort('country')}
              aria-label="Sort by country name"
            >
              Country
              <div className="w-4 h-4 flex items-center justify-center">
                {data.by === 'country' ? (
                  data.order === 'asc' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-2.5 h-2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-2.5 h-2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                )}
              </div>
            </button>
          </th>
          <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-medium py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-28 md:w-64">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-end w-full"
              onClick={() => handleSort('value')}
              aria-label="Sort by value"
            >
              {props.indicator.unit}
              <div className="w-4 h-4 flex items-center justify-center">
                {data.by === 'value' ? (
                  data.order === 'asc' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-2.5 h-2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-2.5 h-2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                )}
              </div>
            </button>
          </th>
          <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-medium py-4 md:py-3 text-neutral-500 dark:text-slate-200 text-center bg-neutral-50 w-[100px] md:w-48 whitespace-nowrap">
            Trend
          </th>
          <th className="sticky top-0 z-20 !border-b dark:border-slate-600 text-[10px] md:text-base font-medium py-4 md:py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-[5px] md:w-[75px]">
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        {data.data.map(
          (item) => !!item.values.length && <Row key={item.id} indicator={props.indicator} country={item} />
        )}
      </tbody>
    </table>
  )
}

export default Table
