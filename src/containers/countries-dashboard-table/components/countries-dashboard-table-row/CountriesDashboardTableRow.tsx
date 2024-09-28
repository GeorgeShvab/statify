import { FC, useRef, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import SquareIcon from "@/ui/icons/SquareIcon"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import Switch from "@/ui/switch/Switch"
import TableBodyCell from "@/ui/table/components/table-body-cell/TableBodyCell"
import TableRow from "@/ui/table/components/table-row/TableRow"
import CountriesDashboardTableRowDropdown from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row-dropdown/CountriesDashboardTableRowDropdown"
import { CountriesDashboardTableRowProps } from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row/types"
import getType from "@/containers/countries-dashboard-table/utils/get-type/getType"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import useOptimisticUpdate from "@/hooks/use-optimistic-update/useOptimisticUpdate"
import cn from "@/utils/cn/cn"
import prettifyValue from "@/utils/prettify-value/prettifyValue"
import { updateCountry } from "@/api/country/update"
import "@/containers/countries-dashboard-table/components/countries-dashboard-table-row/styles.scss"

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

  const lastUpdateDate = new Date(country.updatedAt).toLocaleDateString()

  const type = getType(country)

  return (
    <TableRow
      className={cn(
        "countries-dashboard-table__row",
        selectedItems.includes(country.id) && "selected"
      )}
    >
      <TableBodyCell className="countries-dashboard-table__check-cell">
        <IconButton
          variant="text"
          color="dark"
          className="countries-dashboard__check"
          onClick={handleSelect}
        >
          <SquareIcon />
        </IconButton>
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__id-cell">
        {country.id}
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__name-cell">
        {country.name}
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__type-cell">
        {type}
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__iso2code-cell">
        {country.iso2Code}
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__geocode-cell">
        {country.geoCode}
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__datapoints-cell">
        {prettifyValue(country.datapoints)}
      </TableBodyCell>

      <TableBodyCell className="countries-dashboard-table__last-updated-cell">
        {lastUpdateDate}
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__hidden-cell">
        <div className="countries-dashboard-table__switch-container">
          <Switch checked={value} onChange={handleIsHiddenChange} />
        </div>
      </TableBodyCell>
      <TableBodyCell className="countries-dashboard-table__more-cell">
        <IconButton
          variant="text"
          color="light"
          className="countries-dashboard__more-button"
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
