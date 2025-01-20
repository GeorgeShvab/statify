import { FC, memo, useRef, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import SquareIcon from "@/ui/icons/SquareIcon"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import Switch from "@/ui/switch/Switch"
import TableCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import IndicatorsDashboardTableRowDropdown from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row-dropdown/IndicatorsDashboardTableRowDropdown"
import { IndicatorsDashboardTableRowProps } from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row/types"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import useOptimisticUpdate from "@/hooks/use-optimistic-update/useOptimisticUpdate"
import cn from "@/utils/cn/cn"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import { updateIndicator } from "@/api/admin"
import translate from "@/modules/i18n"

const IndicatorsDashboardTableRow: FC<IndicatorsDashboardTableRowProps> = ({
  indicator,
}) => {
  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)

  const [{ value }, mutate] = useOptimisticUpdate(updateIndicator, {
    initialValue: indicator.hidden,
    errorMessage: translate("errors.unexpected_error"),
    deps: [indicator.hidden],
  })

  const { select, selectedItems } = useSelectable()

  const handleIsHiddenChange = async () => {
    await mutate({ id: indicator.id, hidden: !value }, !value)
  }

  const handleSelect = () => select(indicator.id)

  const lastUpdateDate = new Date(indicator.updatedAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <TableRow
      className={cn(selectedItems.includes(indicator.id) && "selected")}
    >
      <TableCell className="admin-dashboard-table__check-cell">
        <IconButton
          variant="text"
          color="dark"
          data-testid="select-button"
          onClick={handleSelect}
        >
          <SquareIcon />
        </IconButton>
      </TableCell>
      <TableCell size="small">{indicator.id}</TableCell>
      <TableCell size="small" className="text-overflow">
        {indicator.label}
      </TableCell>
      <TableCell size="small" className="text-overflow">
        {indicator.description}
      </TableCell>
      <TableCell className="table-cell-center" size="small">
        {prettifyValue(indicator.datapoints)}
      </TableCell>
      <TableCell className="table-cell-center" size="small">
        {lastUpdateDate}
      </TableCell>
      <TableCell size="small">
        <div className="admin-dashboard-table__cell-switch">
          <Switch checked={value} onChange={handleIsHiddenChange} />
        </div>
      </TableCell>
      <TableCell className="admin-dashboard-table__more-cell">
        <IconButton
          variant="text"
          color="light"
          data-testid="indicator-options-button"
          ref={moreButtonContainer}
          onClick={() => setIsOptionsDropdownOpened(true)}
        >
          <VerticalMoreIcon />
        </IconButton>
        <IndicatorsDashboardTableRowDropdown
          indicator={indicator}
          anchor={moreButtonContainer}
          isOpen={isOptionDropdownOpened}
          onClose={() => setIsOptionsDropdownOpened(false)}
        />
      </TableCell>
    </TableRow>
  )
}

export default memo(IndicatorsDashboardTableRow)
