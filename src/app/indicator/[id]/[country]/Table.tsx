'use client'

import { RowValue, Value } from '@/types'
import { FC } from 'react'
import Row from '@/app/indicator/[id]/[country]/Row'
import useTableData from '@/app/indicator/[id]/[country]/useTableData'
import { Indicator } from '@prisma/client'
import TableComponent from '@/ui/Table/Table'
import TableHeaderCellWithSorting from '@/ui/TableHeaderCellWithSorting/TableHeaderCellWithSorting'

interface Props {
  data: Value[]
  indicator: Indicator
}

const Table: FC<Props> = (props) => {
  const [data, handleSort] = useTableData(props.data)

  const handleYearSort = () => handleSort('year')
  const handleValueSort = () => handleSort('value')

  const renderHeader = () => (
    <tr>
      <TableHeaderCellWithSorting
        className='pl-4 pr-3 md:pr-6 md:pl-6'
        onSortChange={handleValueSort}
        direction={data.order}
        isSelected={data.by === 'value'}
        aria-label='Sort by value'
      >
        Value
      </TableHeaderCellWithSorting>
      <TableHeaderCellWithSorting
        className='pl-3 pr-4 md:pr-6 md:pl-6 w-fit md:w-32'
        onSortChange={handleYearSort}
        direction={data.order}
        isSelected={data.by === 'year'}
        buttonProps={{ className: 'justify-end' }}
        aria-label='Sort by year'
      >
        Year
      </TableHeaderCellWithSorting>
    </tr>
  )

  const renderRow = (item: RowValue) => (
    <Row key={item.id} precition={props.indicator.precision} value={item} />
  )

  return (
    <section className='container'>
      <div className='bg-white rounded-lg border'>
        <TableComponent
          data={data.data}
          renderRow={renderRow}
          renderHeader={renderHeader}
        />
      </div>
    </section>
  )
}

export default Table
