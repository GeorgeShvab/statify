import TableCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import Link from "next/link"
import { FC, memo } from "react"
import { IndicatorTableRowProps } from "@/containers/indicator-table/components/indicator-table-row/IndicatorTableRow.types"

const Row: FC<IndicatorTableRowProps> = ({ indicator, country, ...props }) => {
  return (
    <TableRow {...props}>
      <TableCell>
        <Link
          href={`/indicator/${indicator.id}/${country.id}`}
          className="indicator-table__region-link"
        >
          {country.name}
        </Link>
      </TableCell>
      <TableCell className="indicator-table__value-cell">
        {prettifyValue(country.value, indicator.precision)}
      </TableCell>
      <TableCell className="indicator-table__trend-cell">
        <div className="w-full flex justify-center">
          <img
            alt="Trend"
            src={`${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/row-charts/${indicator.id}/${country.id}.png`}
            className="indicator-table__trend-img"
          />
        </div>
      </TableCell>
      <TableCell className="indicator-table__year-cell">
        {country.year}
      </TableCell>
    </TableRow>
  )
}

Row.displayName = "CountryRow"

export default memo(Row)
