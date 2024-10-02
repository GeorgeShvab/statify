import IconButton from "@/ui/icon-button/IconButton"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const ValuesDashboardTableHead = () => (
  <TableRow>
    <TableHeadCell className="values-dashboard-table__check-cell">
      <IconButton
        variant="text"
        color="light"
        className="values-dashboard__check"
      >
        <></>
      </IconButton>
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__id-cell">
      ID
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__indicator-cell">
      Indicator ID
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__country-cell">
      Country ID
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__value-cell">
      Value
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__year-cell">
      Year
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__last-updated-cell">
      Last update
    </TableHeadCell>
    <TableHeadCell className="values-dashboard-table__more-cell">
      <></>
    </TableHeadCell>
  </TableRow>
)

export default ValuesDashboardTableHead
