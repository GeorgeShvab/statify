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
  ...props
}) => {
  const { selectedItems, select } = useSelectable<number>()

  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)

  const handleSelect = () => select(value.id)

  const lastUpdateDate = new Date(value.updatedAt).toLocaleDateString()

  return (
    <TableRow
      semantic={false}
      className={cn(selectedItems.includes(value.id) && "selected")}
      {...props}
    >
      <TableCell
        semantic={false}
        className="admin-dashboard-table__check-cell flex-5"
      >
        <IconButton variant="text" color="dark" onClick={handleSelect}>
          <SquareIcon />
        </IconButton>
      </TableCell>
      <TableCell semantic={false} size="small" className="flex-20">
        {prettifyValue(value.id)}
      </TableCell>
      <TableCell semantic={false} size="small" className="flex-22-5">
        {value.indicatorId}
      </TableCell>
      <TableCell semantic={false} size="small" className="flex-22-5">
        {value.countryId}
      </TableCell>
      <TableCell
        semantic={false}
        className="table-cell-center flex-15 one-line"
        size="small"
      >
        {prettifyValue(value.value)}
      </TableCell>
      <TableCell
        semantic={false}
        className="table-cell-center flex-7-5"
        size="small"
      >
        {prettifyValue(value.year)}
      </TableCell>
      <TableCell
        semantic={false}
        className="table-cell-center flex-10 one-line"
        size="small"
      >
        {lastUpdateDate}
      </TableCell>
      <TableCell
        semantic={false}
        className="admin-dashboard-table__more-cell flex-5"
      >
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
