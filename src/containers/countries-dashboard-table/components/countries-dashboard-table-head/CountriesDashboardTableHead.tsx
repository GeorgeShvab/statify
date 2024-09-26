import { FC } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const CountriesDashboardTableHead: FC = () => {
  return (
    <TableRow>
      <TableHeadCell className="countries-dashboard-table__check-cell">
        <IconButton
          variant="text"
          color="light"
          className="countries-dashboard__check"
        >
          <></>
        </IconButton>
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__id-cell">
        ID
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__name-cell">
        Name
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__type-cell">
        Type
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__iso2code-cell">
        Iso2Code
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__geocode-cell">
        GeoCode
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__datapoints-cell">
        Datapoints
      </TableHeadCell>

      <TableHeadCell className="countries-dashboard-table__last-updated-cell">
        Last update
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__hidden-cell">
        Hidden
      </TableHeadCell>
      <TableHeadCell className="countries-dashboard-table__more-cell">
        <></>
      </TableHeadCell>
    </TableRow>
  )
}

export default CountriesDashboardTableHead
