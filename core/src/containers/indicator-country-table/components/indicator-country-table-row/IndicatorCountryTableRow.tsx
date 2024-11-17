import { FC, memo } from "react"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import TableBodyCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import { IndicatorCountryTableRowProps } from "@/containers/indicator-country-table/components/indicator-country-table-row/IndicatorCountryTableRow.types"

const Row: FC<IndicatorCountryTableRowProps> = ({
  value,
  precition,
  ...props
}) => {
  return (
    <TableRow {...props}>
      <TableBodyCell className="indicator-country-table__value-cell">
        {prettifyValue(value.value, precition)}
      </TableBodyCell>
      <TableBodyCell className="indicator-country-table__year-cell">
        {value.year}
      </TableBodyCell>
    </TableRow>
  )
}

Row.displayName = "CountryYearRow"

export default memo(Row)
