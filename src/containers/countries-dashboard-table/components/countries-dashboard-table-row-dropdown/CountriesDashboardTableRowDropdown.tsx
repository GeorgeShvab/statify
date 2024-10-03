import { FC } from "react"
import { StoreApi } from "zustand"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import { CountriesDashboardTableRowDropdownProps } from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row-dropdown/types"
import EditCountryModal from "@/containers/modals/edit-country-modal/EditCountryModal"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useMutation from "@/hooks/use-mutation/useMutation"
import { CountriesStore } from "@/store/countries-store/types"
import { exposeCountries, hideCountries } from "@/api/admin"

const CountriesDashboardTableRowDropdown: FC<
  CountriesDashboardTableRowDropdownProps
> = ({ country, ...props }) => {
  const { selectedItems, selectedCount, clearSelection } = useSelectable()
  const {
    hideCountries: hideStoreCountries,
    exposeCountries: exposeStoreCountries,
  } = useContextStore<StoreApi<CountriesStore>>()

  const { openModal } = useModal()

  const [, hideManyCountries] = useMutation(hideCountries, {
    onError: () => exposeStoreCountries(selectedItems),
    errorMessage: "Unexpected error occured",
  })

  const [, exposeManyCountries] = useMutation(exposeCountries, {
    onError: () => hideStoreCountries(selectedItems),
    errorMessage: "Unexpected error occured",
  })

  const handleEditIndicator = () => {
    openModal(<EditCountryModal country={country} />, {
      scrollable: true,
    })
  }

  const handleMoreIndicatorInformation = () => {
    // openModal(<IndicatorModal indicator={indicator} />, {
    //   scrollable: true,
    // })
  }

  const handleHideSelected = async () => {
    hideStoreCountries(selectedItems)
    await hideManyCountries({ ids: selectedItems })
  }

  const handleExposeSelected = async () => {
    exposeStoreCountries(selectedItems)
    await exposeManyCountries({ ids: selectedItems })
  }

  return (
    <Dropdown position="bottom-end" closeOneClick {...props}>
      <DropdownItem size="small" onClick={handleMoreIndicatorInformation}>
        More Information
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditIndicator}>
        Edit Country
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem size="small" onClick={handleHideSelected}>
            Hide all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem size="small" onClick={handleExposeSelected}>
            Expose all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem size="small" onClick={clearSelection}>
            Clear selection ({selectedCount})
          </DropdownItem>
        </>
      )}
    </Dropdown>
  )
}

export default CountriesDashboardTableRowDropdown
