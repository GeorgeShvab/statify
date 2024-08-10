'use client'

import { Value } from '@/types'
import { FC } from 'react'
import Row from './Row'
import SortIcon from '@/ui/Icons/SortIcon'
import SortAscIcon from '@/ui/Icons/SortAscIcon'
import SortDescIcon from '@/ui/Icons/SortDescIcon'
import useTableData from './useTableData'
import { Indicator } from '@prisma/client'
import { ListRowProps } from 'react-virtualized'
import VisualizedTableRows from '@/components/VisualizedTableRows'

interface Props {
  data: Value[]
  indicator: Indicator
}

const Table: FC<Props> = (props) => {
  const [data, handleSort] = useTableData(props.data)

  const handleYearSort = () => handleSort('year')
  const handleValueSort = () => handleSort('value')

  const rowRenderer = ({ key, index, style }: ListRowProps) => (
    <Row
      key={key + data.order + data.by}
      precition={props.indicator.precision}
      value={data.data[index]}
      style={style}
    />
  )

  return (
    <table className='table-auto w-full relative country-table'>
      <thead>
        <tr>
          <th className='!border-b text-xs md:text-base font-medium py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-neutral-500 text-left bg-neutral-50'>
            <button
              className='flex items-center gap-1.5 md:gap-3 justify-start'
              onClick={handleValueSort}
              aria-label='Sort by value'
            >
              Value
              <span className='w-4 h-4 flex items-center justify-center'>
                {data.by === 'value' ? (
                  data.order === 'asc' ? (
                    <SortAscIcon />
                  ) : (
                    <SortDescIcon />
                  )
                ) : (
                  <SortIcon />
                )}
              </span>
            </button>
          </th>
          <th className='!border-b text-xs md:text-base font-medium py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-neutral-500 text-right bg-neutral-50 w-fit md:w-32'>
            <button
              className='flex items-center gap-1.5 md:gap-3 justify-end w-full'
              onClick={handleYearSort}
              aria-label='Sort by year'
            >
              Year
              <span className='w-4 h-4 flex items-center justify-center'>
                {data.by === 'year' ? (
                  data.order === 'asc' ? (
                    <SortAscIcon />
                  ) : (
                    <SortDescIcon />
                  )
                ) : (
                  <SortIcon />
                )}
              </span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <VisualizedTableRows rowCount={data.data.length} rowHeight={48.8}>
          {rowRenderer}
        </VisualizedTableRows>
      </tbody>
    </table>
  )
}

export default Table
