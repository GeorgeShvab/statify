'use client'

import { Indicator, RowItem } from '@/types'
import { FC } from 'react'
import SortIcon from '@/ui/Icons/SortIcon'
import SortAscIcon from '@/ui/Icons/SortAscIcon'
import SortDescIcon from '@/ui/Icons/SortDescIcon'
import Row from './Row'
import useTableData from './useTableData'

interface Props {
  data: RowItem[]
  indicator: Indicator
}

const Table: FC<Props> = (props) => {
  const [data, handleSort] = useTableData(props.data)

  const handleCountrySort = () => handleSort('country')
  const handleValueSort = () => handleSort('value')

  return (
    <table className="table-auto w-full relative country-table">
      <thead>
        <tr className="">
          <th className="top-0 z-20 !border-b text-[10px] md:text-base font-bold py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 text-left w-24 md:w-[350px] bg-neutral-50">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-start"
              onClick={handleCountrySort}
              aria-label="Sort by country name"
            >
              Region
              <span className="w-4 h-4 flex items-center justify-center">
                {data.by === 'country' ? data.order === 'asc' ? <SortAscIcon /> : <SortDescIcon /> : <SortIcon />}
              </span>
            </button>
          </th>
          <th className="!border-b text-[10px] md:text-base font-medium py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-neutral-500 text-right bg-neutral-50 w-28 md:w-64">
            <button
              className="flex items-center gap-1.5 md:gap-3 justify-end w-full text-right"
              onClick={handleValueSort}
              aria-label="Sort by value"
            >
              {props.indicator.unit}
              <span className="w-4 h-4 flex items-center justify-center">
                {data.by === 'value' ? data.order === 'asc' ? <SortAscIcon /> : <SortDescIcon /> : <SortIcon />}
              </span>
            </button>
          </th>
          <th className="!border-b text-[10px] md:text-base font-medium py-4 md:py-3 text-neutral-500 text-center bg-neutral-50 w-[100px] md:w-48 whitespace-nowrap">
            Trend
          </th>
          <th className="!border-b text-[10px] md:text-base font-medium py-4 md:py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 text-right bg-neutral-50 w-[5px] md:w-[75px]">
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((item) => (
          <Row key={item.id} indicator={props.indicator} country={item} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
