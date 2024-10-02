import { FC, memo, useRef, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import TableCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import ValuesDashboardTableRowDropdown from "@/containers/values-dashboard-table/components/values-dashboard-table-row-dropdown/ValuesDashboardTableRowDropdown"
import { ValuesDashboardTableRowProps } from "@/containers/values-dashboard-table/components/values-dashboard-table-row/types"
import cn from "@/utils/cn/cn"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import "@/containers/values-dashboard-table/components/values-dashboard-table-row/styles.scss"

const IndicatorsDashboardTableRow: FC<ValuesDashboardTableRowProps> = ({
  value,
}) => {
  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)

  // const [{ value }, mutate] = useOptimisticUpdate(updateIndicator, {
  //   initialValue: indicator.hidden,
  //   errorMessage: "Unexpected error occured",
  //   deps: [indicator.hidden],
  // })

  const lastUpdateDate = new Date(value.updatedAt).toLocaleDateString()

  return (
    <TableRow className={cn("values-dashboard-table__row")}>
      <TableCell className="values-dashboard-table__check-cell">
        <></>
      </TableCell>
      <TableCell className="values-dashboard-table__id-cell">
        {prettifyValue(value.id)}
      </TableCell>
      <TableCell className="values-dashboard-table__indicator-cell">
        {value.indicatorId}
      </TableCell>
      <TableCell className="values-dashboard-table__country-cell">
        {value.countryId}
      </TableCell>
      <TableCell className="values-dashboard-table__value-cell">
        {prettifyValue(value.value)}
      </TableCell>
      <TableCell className="values-dashboard-table__year-cell">
        {prettifyValue(value.year)}
      </TableCell>
      <TableCell className="values-dashboard-table__last-updated-cell">
        {lastUpdateDate}
      </TableCell>
      <TableCell className="values-dashboard-table__more-cell">
        <IconButton
          variant="text"
          color="light"
          className="values-dashboard__more-button"
          ref={moreButtonContainer}
          onClick={() => setIsOptionsDropdownOpened(true)}
        >
          <VerticalMoreIcon />
        </IconButton>
        <ValuesDashboardTableRowDropdown
          value={value}
          anchor={moreButtonContainer}
          isOpen={isOptionDropdownOpened}
          onClose={() => setIsOptionsDropdownOpened(false)}
        />
      </TableCell>
    </TableRow>
  )
}

export default memo(IndicatorsDashboardTableRow)
