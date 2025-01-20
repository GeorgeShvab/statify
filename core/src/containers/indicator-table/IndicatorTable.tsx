"use client"

import { FC } from "react"
import useTableData from "@/app/(public)/(with-toolbar)/indicator/[id]/useTableData"
import TableComponent from "@/ui/table/Table"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableHeadSortingCell from "@/ui/table/components/table-head-sorting-cell/TableHeadSortingCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import { IndicatorTableProps } from "@/containers/indicator-table/IndicatorTable.types"
import IndicatorTableRow from "@/containers/indicator-table/components/indicator-table-row/IndicatorTableRow"
import { CountryRowValue } from "@/types/country.types"
import translate from "@/modules/i18n"
import "@/containers/indicator-table/styles.scss"

const IndicatorTable: FC<IndicatorTableProps> = (props) => {
  const [data, handleSort] = useTableData(props.data)

  const handleCountrySort = () => handleSort("country")
  const handleValueSort = () => handleSort("value")

  const renderHeader = () => (
    <TableRow>
      <TableHeadSortingCell
        className="indicator-table__region-cell"
        onSortChange={handleCountrySort}
        direction={data.order}
        isSelected={data.by === "country"}
        aria-label={translate("pages.indicator.sort_by_region")}
        data-testid="sort-by-region"
      >
        {translate("common.region")}
      </TableHeadSortingCell>
      <TableHeadSortingCell
        className="indicator-table__value-cell"
        onSortChange={handleValueSort}
        direction={data.order}
        isSelected={data.by === "value"}
        buttonProps={{ className: "indicator-table__value-sorting-button" }}
        aria-label={translate("pages.indicator.sort_by_value")}
        data-testid="sort-by-value"
      >
        {translate("common.value")}
      </TableHeadSortingCell>
      <TableHeadCell className="indicator-table__trend-cell">
        {translate("common.trend")}
      </TableHeadCell>
      <TableHeadCell className="indicator-table__year-cell">
        {translate("common.year")}
      </TableHeadCell>
    </TableRow>
  )

  const renderRow = (item: CountryRowValue) => (
    <IndicatorTableRow
      key={item.id}
      indicator={props.indicator}
      country={item}
    />
  )

  return (
    <section className="container">
      <TableComponent
        data-current-sort-direction={data.order}
        data-current-sort={data.by}
        data={data.data}
        renderRow={renderRow}
        renderHeader={renderHeader}
      />
    </section>
  )
}

export default IndicatorTable
