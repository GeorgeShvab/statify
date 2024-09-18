import IconButton from "@/ui/icon-button/IconButton"
import SquareIcon from "@/ui/icons/SquareIcon"
import Switch from "@/ui/switch/Switch"
import TableCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import { FC, useState } from "react"
import { IndicatorsDashboardTableRowProps } from "./types"
import cn from "@/utils/cn/cn"
import "./styles.scss"
import prettifyValue from "@/utils/prettify-value/prettifyValue"

const IndicatorsDashboardTableRow: FC<IndicatorsDashboardTableRowProps> = ({
  indicator,
}) => {
  const [absolute, setAbsolute] = useState(indicator.absolute)
  const [hidden, setHidden] = useState(indicator.hidden)
  const [isSelected, setIsSelected] = useState(false)

  const lastUpdateDate = new Date(indicator.updatedAt).toLocaleDateString()

  return (
    <TableRow
      className={cn(
        "indicators-dashboard-table__row",
        isSelected && "selected"
      )}
    >
      <TableCell className="indicators-dashboard-table__check-cell">
        <IconButton
          variant="text"
          color="dark"
          className="indicators-dashboard__check"
          onClick={() => setIsSelected((prev) => !prev)}
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
      <TableCell className="indicators-dashboard-table__absolute-cell">
        <div className="indicators-dashboard-table__switch-container">
          <Switch checked={absolute} onChange={setAbsolute} />
        </div>
      </TableCell>
      <TableCell className="indicators-dashboard-table__hidden-cell">
        <div className="indicators-dashboard-table__switch-container">
          <Switch checked={hidden} onChange={setHidden} />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default IndicatorsDashboardTableRow
