import { FC, useRef, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import SquareIcon from "@/ui/icons/SquareIcon"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import Switch from "@/ui/switch/Switch"
import TableBodyCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import CountriesDashboardTableRowDropdown from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row-dropdown/CountriesDashboardTableRowDropdown"
import { CountriesDashboardTableRowProps } from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row/types"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import useOptimisticUpdate from "@/hooks/use-optimistic-update/useOptimisticUpdate"
import cn from "@/utils/cn/cn"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import { updateCountry } from "@/api/admin"

const CountriesDashboardTableRow: FC<CountriesDashboardTableRowProps> = ({
  country,
}) => {
  const moreButtonContainer = useRef(null)

  const [isOptionDropdownOpened, setIsOptionsDropdownOpened] = useState(false)

  const { select, selectedItems } = useSelectable()

  const [{ value }, mutate] = useOptimisticUpdate(updateCountry, {
    initialValue: country.hidden,
    errorMessage: "Unexpected error occured",
    deps: [country.hidden],
  })

  const handleIsHiddenChange = async () => {
    await mutate({ id: country.id, hidden: !value }, !value)
  }

  const handleSelect = () => select(country.id)

  const lastUpdateDate = new Date(country.updatedAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  )

  return (
    <TableRow className={cn(selectedItems.includes(country.id) && "selected")}>
      <TableBodyCell className="admin-dashboard-table__check-cell">
        <IconButton
          variant="text"
          color="dark"
          data-testid="select-button"
          onClick={handleSelect}
        >
          <SquareIcon />
        </IconButton>
      </TableBodyCell>
      <TableBodyCell size="small">{country.id}</TableBodyCell>
      <TableBodyCell size="small">{country.name}</TableBodyCell>
      <TableBodyCell className="table-cell-center" size="small">
        {country.type}
      </TableBodyCell>
      <TableBodyCell className="table-cell-center" size="small">
        {country.iso2Code}
      </TableBodyCell>
      <TableBodyCell className="table-cell-center" size="small">
        {country.geoCode}
      </TableBodyCell>
      <TableBodyCell className="table-cell-center" size="small">
        {prettifyValue(country.datapoints)}
      </TableBodyCell>
      <TableBodyCell className="table-cell-center" size="small">
        {lastUpdateDate}
      </TableBodyCell>
      <TableBodyCell>
        <div className="admin-dashboard-table__cell-switch">
          <Switch checked={value} onChange={handleIsHiddenChange} />
        </div>
      </TableBodyCell>
      <TableBodyCell className="admin-dashboard-table__more-cell">
        <IconButton
          variant="text"
          color="light"
          data-testid="country-options-button"
          ref={moreButtonContainer}
          onClick={() => setIsOptionsDropdownOpened(true)}
        >
          <VerticalMoreIcon />
        </IconButton>
        <CountriesDashboardTableRowDropdown
          country={country}
          anchor={moreButtonContainer}
          isOpen={isOptionDropdownOpened}
          onClose={() => setIsOptionsDropdownOpened(false)}
        />
      </TableBodyCell>
    </TableRow>
  )
}

export default CountriesDashboardTableRow
