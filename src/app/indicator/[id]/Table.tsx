"use client"

import { CountryRowValue } from "@/types/types"
import { FC } from "react"
import Row from "@/app/indicator/[id]/Row"
import useTableData from "@/app/indicator/[id]/useTableData"
import { Indicator } from "@prisma/client"
import TableComponent from "@/ui/table/Table"
import TableHeaderCell from "@/ui/table-header-cell/TableHeaderCell"
import TableHeaderCellWithSorting from "@/ui/table-header-cell-with-sorting/TableHeaderCellWithSorting"

interface Props {
  data: CountryRowValue[]
  indicator: Indicator
}

const Table: FC<Props> = (props) => {
  const [data, handleSort] = useTableData(props.data)

  const handleCountrySort = () => handleSort("country")
  const handleValueSort = () => handleSort("value")

  const renderHeader = () => (
    <tr>
      <TableHeaderCellWithSorting
        className="w-24 md:w-[350px] !font-bold"
        onSortChange={handleCountrySort}
        direction={data.order}
        isSelected={data.by === "country"}
        aria-label="Sort by region name"
      >
        Region
      </TableHeaderCellWithSorting>
      <TableHeaderCellWithSorting
        className="text-right w-28 md:w-64"
        onSortChange={handleValueSort}
        direction={data.order}
        isSelected={data.by === "value"}
        buttonProps={{ className: "justify-end" }}
        aria-label="Sort by value"
      >
        Value
      </TableHeaderCellWithSorting>
      <TableHeaderCell className="text-center w-[100px] md:w-48 whitespace-nowrap">
        Trend
      </TableHeaderCell>
      <TableHeaderCell className="pl-3 pr-4 md:pr-6 md:pl-6 text-right w-[5px] md:w-[75px]">
        Year
      </TableHeaderCell>
    </tr>
  )

  const renderRow = (item: CountryRowValue) => (
    <Row key={item.id} indicator={props.indicator} country={item} />
  )

  return (
    <section className="container mb-2 md:mb-3.5">
      <div className="bg-white rounded-lg border">
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
