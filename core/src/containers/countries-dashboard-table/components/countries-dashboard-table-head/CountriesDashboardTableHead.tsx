import { FC } from "react"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const CountriesDashboardTableHead: FC = () => {
  return (
    <TableRow>
      <TableHeadCell className="admin-dashboard-table__check-cell">
        <></>
      </TableHeadCell>
      <TableHeadCell className="table-cell-10 table-cell-left" size="small">
        ID
      </TableHeadCell>
      <TableHeadCell className="table-cell-left" size="small">
        Name
      </TableHeadCell>
      <TableHeadCell className="table-cell-7-5" size="small">
        Type
      </TableHeadCell>
      <TableHeadCell className="table-cell-7-5" size="small">
        Iso2Code
      </TableHeadCell>
      <TableHeadCell className="table-cell-7-5" size="small">
        GeoCode
      </TableHeadCell>
      <TableHeadCell className="table-cell-10" size="small">
        Datapoints
      </TableHeadCell>
      <TableHeadCell className="table-cell-10" size="small">
        Last update
      </TableHeadCell>
      <TableHeadCell className="table-cell-7-5" size="small">
        Hidden
      </TableHeadCell>
      <TableHeadCell className="admin-dashboard-table__more-cell">
        <></>
      </TableHeadCell>
    </TableRow>
  )
}

export default CountriesDashboardTableHead
