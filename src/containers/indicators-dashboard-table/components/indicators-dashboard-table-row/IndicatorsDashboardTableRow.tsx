import IconButton from "@/ui/icon-button/IconButton"
import SquareIcon from "@/ui/icons/SquareIcon"
import Switch from "@/ui/switch/Switch"
import TableCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import { FC, useRef, useState } from "react"
import { IndicatorsDashboardTableRowProps } from "./types"
import cn from "@/utils/cn/cn"
import "./styles.scss"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import useMutation from "@/hooks/use-mutation/useMutation"
import { updateIndicator } from "@/api/indicator/update"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import Dropdown from "@/ui/dropdown/Dropdown"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import EditIndicatorModal from "@/containers/modals/edit-indicator-modal/EditIndicatorModal"

const IndicatorsDashboardTableRow: FC<IndicatorsDashboardTableRowProps> = ({
  indicator,
}) => {
  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [isHidden, setIsHidden] = useState(indicator.hidden)

  const { openModal } = useModal()

  const [data, mutate] = useMutation(updateIndicator)

  const handleIsHiddenChange = async () => {
    setIsHidden((prev) => !prev)
    await mutate({ id: indicator.id, hidden: !isHidden })
  }

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
      <TableCell className="indicators-dashboard-table__hidden-cell">
        <div className="indicators-dashboard-table__switch-container">
          <Switch checked={isHidden} onChange={handleIsHiddenChange} />
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
        <Dropdown
          anchor={moreButtonContainer}
          position="bottom-end"
          isOpen={isOptionDropdownOpened}
          onClose={() => setIsOptionsDropdownOpened(false)}
          closeOneClick
        >
          <DropdownItem
            className="indicator-options-dropdown__item"
            size="small"
          >
            More Information
          </DropdownItem>
          <DropdownItem
            className="indicator-options-dropdown__item"
            size="small"
            onClick={() =>
              openModal(<EditIndicatorModal indicator={indicator} />, {
                scrollable: true,
              })
            }
          >
            Update Indicator
          </DropdownItem>
          <DropdownItem
            className="indicator-options-dropdown__item"
            size="small"
          >
            Delete Indicator
          </DropdownItem>
        </Dropdown>
      </TableCell>
    </TableRow>
  )
}

export default IndicatorsDashboardTableRow
