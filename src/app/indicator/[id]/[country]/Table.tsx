'use client'

import { Indicator, Value } from '@/types'
import prettifyValue from '@/utils/prettifyValue'
import quickSort from '@/utils/quickSort'
import { FC, memo, useState } from 'react'

interface Props {
  data: Value[]
  indicator: Indicator
}

interface State {
  data: Value[]
  order: 'asc' | 'desc'
  by?: 'year' | 'value'
}

const Row: FC<{ value: Value; indicator: Indicator }> = memo(({ value, indicator }) => {
  return (
    <tr className="country-row" key={value.year}>
      <td className="border-b dark:border-slate-600 py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal dark:text-slate-200 text-left">
        {prettifyValue(value.value.toFixed(2))} {indicator.unitSymbol}
      </td>
      <td className="border-b dark:border-slate-600 py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-fit md:w-32">
        {value.year}
      </td>
    </tr>
  )
})

const Table: FC<Props> = (props) => {
  const [data, setData] = useState<State>({
    data: props.data,
    order: 'asc',
    by: 'year',
  })

  const handleSort = (by: 'year' | 'value') => {
    if (by === 'year') {
      setData((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'year' ? 'desc' : 'asc',
        by: 'year',
        data: quickSort(
          prev.data,
          (prev.order === 'asc' && prev.by === 'year' ? 'desc' : 'asc') as any,
          (item) => item.year
        ),
      }))
    } else {
      setData((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc',
        by: 'value',
        data: quickSort(
          prev.data,
          (prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc') as any,
          (item) => item.value
        ),
      }))
    }
  }

  return (
    <table className="table-auto w-full relative country-table">
      <thead>
        <tr className="">
          <th className="!border-b dark:border-slate-600 text-xs md:text-base font-medium py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-left bg-neutral-50">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-start"
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
          <th className="!border-b dark:border-slate-600 text-xs md:text-base font-medium py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-fit md:w-32">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-end w-full"
              onClick={() => handleSort('year')}
              aria-label="Sort by year"
            >
              Year
              <div className="w-4 h-4 flex items-center justify-center">
                {data.by === 'year' ? (
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
        </tr>
      </thead>
      <tbody>
        {data.data.map((item) => (
          <Row key={item.id} indicator={props.indicator} value={item} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
