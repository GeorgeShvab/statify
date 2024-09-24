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
import { updateIndicator } from "@/api/indicator/update"
import "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row/styles.scss"

const IndicatorsDashboardTableRow: FC<IndicatorsDashboardTableRowProps> = ({
  indicator,
}) => {
  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)

  const [{ value }, mutate] = useOptimisticUpdate(updateIndicator, {
    initialValue: indicator.hidden,
    errorMessage: "Unexpected error occured",
    deps: [indicator.hidden],
  })

  const { select, selectedItems } = useSelectable()

  const handleIsHiddenChange = async () => {
    await mutate({ id: indicator.id, hidden: !value }, !value)
  }

  const handleSelect = () => select(indicator.id)

  const lastUpdateDate = new Date(indicator.updatedAt).toLocaleDateString()

  return (
    <TableRow
      className={cn(
        "indicators-dashboard-table__row",
        selectedItems.includes(indicator.id) && "selected"
      )}
    >
      <TableCell className="indicators-dashboard-table__check-cell">
        <IconButton
          variant="text"
          color="dark"
          className="indicators-dashboard__check"
          onClick={handleSelect}
        >
          <SquareIcon />
        </IconButton>
      </TableCell>
      <TableCell className="indicators-dashboard-table__id-cell">
        {indicator.id}
      </TableCell>
      <TableCell className="indicators-dashboard-table__label-cell">
        {indicator.label}
      </TableCell>
      <TableCell className="indicators-dashboard-table__description-cell">
        {indicator.description}
      </TableCell>
      <TableCell className="indicators-dashboard-table__datapoints-cell">
        {prettifyValue(indicator.datapoints)}
      </TableCell>
      <TableCell className="indicators-dashboard-table__last-updated-cell">
        {lastUpdateDate}
      </TableCell>
      <TableCell className="indicators-dashboard-table__hidden-cell">
        <div className="indicators-dashboard-table__switch-container">
          <Switch checked={value} onChange={handleIsHiddenChange} />
        </div>
      </TableCell>
      <TableCell className="indicators-dashboard-table__more-cell">
        <IconButton
          variant="text"
          color="light"
          className="indicators-dashboard__more-button"
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
