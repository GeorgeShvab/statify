import { FC, memo, useRef, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import SquareIcon from "@/ui/icons/SquareIcon"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import TableCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import ValuesDashboardTableRowDropdown from "@/containers/values-dashboard-table/components/values-dashboard-table-row-dropdown/ValuesDashboardTableRowDropdown"
import { ValuesDashboardTableRowProps } from "@/containers/values-dashboard-table/components/values-dashboard-table-row/types"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import cn from "@/utils/cn/cn"
import prettifyValue from "@/utils/prettify-value/prettifyValue"

const IndicatorsDashboardTableRow: FC<ValuesDashboardTableRowProps> = ({
  value,
}) => {
  const { selectedItems, select } = useSelectable<number>()

  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)

  const handleSelect = () => select(value.id)

  const lastUpdateDate = new Date(value.updatedAt).toLocaleDateString()

  return (
    <TableRow className={cn(selectedItems.includes(value.id) && "selected")}>
      <TableCell className="admin-dashboard-table__check-cell">
        <IconButton variant="text" color="dark" onClick={handleSelect}>
          <SquareIcon />
        </IconButton>
      </TableCell>
      <TableCell size="small">{prettifyValue(value.id)}</TableCell>
      <TableCell size="small">{value.indicatorId}</TableCell>
      <TableCell size="small">{value.countryId}</TableCell>
      <TableCell className="table-cell-center" size="small">
        {prettifyValue(value.value)}
      </TableCell>
      <TableCell className="table-cell-center" size="small">
        {prettifyValue(value.year)}
      </TableCell>
      <TableCell className="table-cell-center" size="small">
        {lastUpdateDate}
      </TableCell>
      <TableCell className="admin-dashboard-table__more-cell">
        <IconButton
          variant="text"
          color="light"
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
