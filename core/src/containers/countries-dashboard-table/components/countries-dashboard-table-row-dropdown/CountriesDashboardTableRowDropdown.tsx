import { FC } from "react"
import { StoreApi } from "zustand"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import { CountriesDashboardTableRowDropdownProps } from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row-dropdown/types"
import CountryModal from "@/containers/modals/country-modal/CountryModal"
import EditCountryModal from "@/containers/modals/edit-country-modal/EditCountryModal"
import { useConfirm } from "@/providers/confirm-provider/ConfirmProvider"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useMutation from "@/hooks/use-mutation/useMutation"
import { CountriesStore } from "@/store/countries-store/types"
import { deleteCountries, exposeCountries, hideCountries } from "@/api/admin"

const CountriesDashboardTableRowDropdown: FC<
  CountriesDashboardTableRowDropdownProps
> = ({ country, ...props }) => {
  const { selectedItems, selectedCount, clearSelection } = useSelectable()
  const {
    hideCountries: hideStoreCountries,
    exposeCountries: exposeStoreCountries,
    deleteCountries: deleteStoreCountries,
    updateCountry,
    revert,
    backup,
  } = useContextStore<StoreApi<CountriesStore>>()

  const { openModal } = useModal()

  const { openConfirm } = useConfirm()

  const [, hideManyCountries] = useMutation(hideCountries, {
    onError: revert,
    errorMessage: "Unexpected error occured",
  })

  const [, exposeManyCountries] = useMutation(exposeCountries, {
    onError: revert,
    errorMessage: "Unexpected error occured",
  })

  const [, deleteManyCountries] = useMutation(deleteCountries, {
    errorMessage: "Unexpected error occured",
    successMessage: "Countries deleted",
  })

  const handleEditCountry = () => {
    openModal(
      <EditCountryModal onSuccess={updateCountry} country={country} />,
      {
        scrollable: true,
      }
    )
  }

  const handleMoreCountryInformation = () => {
    openModal(<CountryModal country={country} />, {
      scrollable: true,
    })
  }

  const handleHideSelected = async () => {
    backup()
    hideStoreCountries(selectedItems)
    await hideManyCountries({ ids: selectedItems })
  }

  const handleExposeSelected = async () => {
    backup()
    exposeStoreCountries(selectedItems)
    await exposeManyCountries({ ids: selectedItems })
  }

  const handleDeleteCountry = () => {
    openConfirm({
      title: `Are you sure you want to delete country (${country.id})?`,
      subtitle:
        "This action can not be reverted. Associated with country values will be deleted too.",
      severity: "danger",
      onConfirm: async () => {
        await deleteManyCountries([country.id])
        deleteStoreCountries([country.id])
      },
    })
  }

  const handleDeleteSelectedCountries = () => {
    openConfirm({
      title: `Are you sure you want to delete selected countries (${selectedCount})?`,
      subtitle:
        "This action can not be reverted. Associated with country values will be deleted too.",
      severity: "danger",
      onConfirm: async () => {
        await deleteManyCountries(selectedItems)
        deleteStoreCountries(selectedItems)
      },
    })
  }

  return (
    <Dropdown position="bottom-end" closeOneClick {...props}>
      <DropdownItem size="small" onClick={handleMoreCountryInformation}>
        More Information
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditCountry}>
        Edit Country
      </DropdownItem>
      <DropdownItem size="small" onClick={handleDeleteCountry}>
        Delete Country
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem size="small" onClick={handleHideSelected}>
            Hide all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem size="small" onClick={handleExposeSelected}>
            Expose all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem size="small" onClick={handleDeleteSelectedCountries}>
            Delete selected ({selectedCount})
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
