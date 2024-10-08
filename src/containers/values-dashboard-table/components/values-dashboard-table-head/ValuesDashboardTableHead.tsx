import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const ValuesDashboardTableHead = () => (
  <TableRow semantic={false}>
    <TableHeadCell
      semantic={false}
      className="admin-dashboard-table__check-cell"
    >
      <></>
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="table-cell-left flex-20"
      size="small"
    >
      ID
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="table-cell-left flex-22-5"
      size="small"
    >
      Indicator ID
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="table-cell-left flex-22-5"
      size="small"
    >
      Country ID
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="flex-7-5 table-cell-center"
      size="small"
    >
      Value
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="flex-7-5 table-cell-center"
      size="small"
    >
      Year
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="flex-10 table-cell-center"
      size="small"
    >
      Last update
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="admin-dashboard-table__more-cell"
    >
      <></>
    </TableHeadCell>
  </TableRow>
)

export default ValuesDashboardTableHead
