"use client"

import { FC } from "react"
import useTableData from "@/app/(public)/(with-toolbar)/indicator/[id]/[country]/useTableData"
import TableComponent from "@/ui/table/Table"
import TableHeadCellWithSorting from "@/ui/table/components/table-head-sorting-cell/TableHeadSortingCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import { IndicatorCountryTableProps } from "@/containers/indicator-country-table/IndicatorCountryTable.types"
import IndicatorCountryTableRow from "@/containers/indicator-country-table/components/indicator-country-table-row/IndicatorCountryTableRow"
import { RowValue } from "@/types/value.types"
import "@/containers/indicator-country-table/styles.scss"

const IndicatorCountryTable: FC<IndicatorCountryTableProps> = (props) => {
  const [data, handleSort] = useTableData(props.data)

  const handleYearSort = () => handleSort("year")
  const handleValueSort = () => handleSort("value")

  const renderHeader = () => (
    <TableRow>
      <TableHeadCellWithSorting
        className="indicator-country-table__value-cell"
        onSortChange={handleValueSort}
        direction={data.order}
        isSelected={data.by === "value"}
        aria-label="Sort by value"
      >
        Value
      </TableHeadCellWithSorting>
      <TableHeadCellWithSorting
        className="indicator-country-table__year-cell"
        onSortChange={handleYearSort}
        direction={data.order}
        isSelected={data.by === "year"}
        buttonProps={{
          className: "indicator-country-table__value-sorting-button",
        }}
        aria-label="Sort by year"
      >
        Year
      </TableHeadCellWithSorting>
    </TableRow>
  )

  const renderRow = (item: RowValue) => (
    <IndicatorCountryTableRow
      key={item.id}
      precition={props.indicator.precision}
      value={item}
    />
  )

  return (
    <section className="container">
      <TableComponent
        data={data.data}
        renderRow={renderRow}
        renderHeader={renderHeader}
      />
    </section>
  )
}

export default IndicatorCountryTable
