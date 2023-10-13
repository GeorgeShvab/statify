'use client'

import { Indicator, Country, Value } from '@/types'
import { FC, useState } from 'react'
import quickSort from '@/utils/quickSort'
import Rows from './Rows'

interface Props {
  data: (Country & { values: Value[]; name: string })[]
  indicator: Indicator
}

interface State {
  data: (Country & { values: Value[] })[]
  order: 'asc' | 'desc'
  by?: 'country' | 'value'
}

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
        data: quickSort(prev.data, prev.order === 'asc' && prev.by === 'country' ? 'desc' : 'asc', (item) => item.name),
      }))
    } else {
      setData((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc',
        by: 'value',
        data: quickSort(
          prev.data,
          prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc',
          (item) => item.values[item.values.length - 1].value
        ),
      }))
    }
  }

  return (
    <table className="table-auto w-full relative country-table">
      <thead>
        <tr className="">
          <th className="top-0 z-20 !border-b text-[10px] md:text-base font-bold py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 text-left w-24 md:w-[350px] bg-neutral-50">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-start select-auto"
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
          <th className="!border-b text-[10px] md:text-base font-medium py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 text-right bg-neutral-50 w-28 md:w-64">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-end w-full text-right select-auto"
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
          <th className="!border-b select-auto text-[10px] md:text-base font-medium py-4 md:py-3 text-neutral-500 text-center bg-neutral-50 w-[100px] md:w-48 whitespace-nowrap">
            Trend
          </th>
          <th className="!border-b select-auto text-[10px] md:text-base font-medium py-4 md:py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 text-right bg-neutral-50 w-[5px] md:w-[75px]">
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        <Rows data={data.data} indicator={props.indicator} />
      </tbody>
    </table>
  )
}

export default Table
