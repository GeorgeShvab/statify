import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import translate from "@/modules/i18n"

const IndicatorsDashboardTableHead = () => (
  <TableRow>
    <TableHeadCell className="admin-dashboard-table__check-cell">
      <></>
    </TableHeadCell>
    <TableHeadCell className="table-cell-15 table-cell-left" size="small">
      {translate("common.id")}
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      {translate("common.label")}
    </TableHeadCell>
    <TableHeadCell className="table-cell-left" size="small">
      {translate("common.description")}
    </TableHeadCell>
    <TableHeadCell className="table-cell-10" size="small">
      {translate("common.datapoints")}
    </TableHeadCell>
    <TableHeadCell className="table-cell-10 table-cell-center" size="small">
      {translate("common.last_update")}
    </TableHeadCell>
    <TableHeadCell className="table-cell-7-5 table-cell-center" size="small">
      {translate("common.hidden")}
    </TableHeadCell>
    <TableHeadCell className="admin-dashboard-table__more-cell">
      <></>
    </TableHeadCell>
  </TableRow>
)

export default IndicatorsDashboardTableHead
