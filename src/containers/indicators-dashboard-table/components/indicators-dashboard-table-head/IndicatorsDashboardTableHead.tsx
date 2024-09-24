import IconButton from "@/ui/icon-button/IconButton"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"

const IndicatorsDashboardTableHead = () => (
  <TableRow>
    <TableHeadCell className="indicators-dashboard-table__check-cell">
      <IconButton
        variant="text"
        color="light"
        className="indicators-dashboard__check"
      >
        <></>
      </IconButton>
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__id-cell">
      ID
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__label-cell">
      Label
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__description-cell">
      Description
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__datapoints-cell">
      Datapoints
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__last-updated-cell">
      Last update
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__hidden-cell">
      Hidden
    </TableHeadCell>
    <TableHeadCell className="indicators-dashboard-table__more-cell">
      <></>
    </TableHeadCell>
  </TableRow>
)

export default IndicatorsDashboardTableHead
