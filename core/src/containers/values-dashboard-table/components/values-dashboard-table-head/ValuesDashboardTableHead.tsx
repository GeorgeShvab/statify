import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import translate from "@/modules/i18n"

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
      {translate("common.id")}
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="table-cell-left flex-22-5"
      size="small"
    >
      {translate("pages.values_dashboard.indicator_id")}
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="table-cell-left flex-22-5"
      size="small"
    >
      {translate("pages.values_dashboard.country_id")}
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="flex-15 table-cell-center"
      size="small"
    >
      {translate("common.value")}
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="flex-7-5 table-cell-center"
      size="small"
    >
      {translate("common.year")}
    </TableHeadCell>
    <TableHeadCell
      semantic={false}
      className="flex-10 table-cell-center"
      size="small"
    >
      {translate("common.last_update")}
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
