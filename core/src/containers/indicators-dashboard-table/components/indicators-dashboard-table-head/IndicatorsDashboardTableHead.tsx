import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const IndicatorsDashboardTableHead = () => (
  <TableRow>
    <TableHeadCell className="admin-dashboard-table__check-cell">
      <></>
    </TableHeadCell>
    <TableHeadCell className="table-cell-15 table-cell-left" size="small">
      ID
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      Label
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      Description
    </TableHeadCell>
    <TableHeadCell className="table-cell-10" size="small">
      Datapoints
    </TableHeadCell>
    <TableHeadCell className="table-cell-10 table-cell-center" size="small">
      Last update
    </TableHeadCell>
    <TableHeadCell className="table-cell-7-5 table-cell-center" size="small">
      Hidden
    </TableHeadCell>
    <TableHeadCell className="admin-dashboard-table__more-cell">
      <></>
    </TableHeadCell>
  </TableRow>
)

export default IndicatorsDashboardTableHead
