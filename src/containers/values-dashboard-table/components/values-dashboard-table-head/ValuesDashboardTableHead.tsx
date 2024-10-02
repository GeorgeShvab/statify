import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const ValuesDashboardTableHead = () => (
  <TableRow>
    <TableHeadCell className="admin-dashboard-table__check-cell">
      <></>
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      ID
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      Indicator ID
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      Country ID
    </TableHeadCell>
    <TableHeadCell className="table-cell-7-5 table-cell-center" size="small">
      Value
    </TableHeadCell>
    <TableHeadCell className="table-cell-7-5 table-cell-center" size="small">
      Year
    </TableHeadCell>
    <TableHeadCell className="table-cell-10 table-cell-center" size="small">
      Last update
    </TableHeadCell>
    <TableHeadCell className="admin-dashboard-table__more-cell">
      <></>
    </TableHeadCell>
  </TableRow>
)

export default ValuesDashboardTableHead
