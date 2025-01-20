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
import translate from "@/modules/i18n"

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
    errorMessage: translate("errors.unexpected_error"),
  })

  const [, exposeManyCountries] = useMutation(exposeCountries, {
    onError: revert,
    errorMessage: translate("errors.unexpected_error"),
  })

  const [, deleteManyCountries] = useMutation(deleteCountries, {
    errorMessage: translate("errors.unexpected_error"),
    successMessage: translate("pages.countries_dashboard.deleted_successfully"),
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
      title: translate("pages.countries_dashboard.confirm_deletion", {
        id: country.id,
      }),
      subtitle: translate("pages.countries_dashboard.deletion_unrevertable"),
      severity: "danger",
      onConfirm: async () => {
        await deleteManyCountries([country.id])
        deleteStoreCountries([country.id])
      },
    })
  }

  const handleDeleteSelectedCountries = () => {
    openConfirm({
      title: translate("pages.countries_dashboard.confirm_multiple_deletion", {
        count: selectedCount,
      }),
      subtitle: translate(
        "pages.countries_dashboard.deletion_multiple_unrevertable"
      ),
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
        {translate("pages.dashboard.more_info")}
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditCountry}>
        {translate("pages.countries_dashboard.edit_country")}
      </DropdownItem>
      <DropdownItem size="small" onClick={handleDeleteCountry}>
        {translate("pages.countries_dashboard.delete_country")}
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem size="small" onClick={handleHideSelected}>
            {translate("pages.dashboard.hide_selected", {
              count: selectedCount,
            })}
          </DropdownItem>
          <DropdownItem size="small" onClick={handleExposeSelected}>
            {translate("pages.dashboard.expose_selected", {
              count: selectedCount,
            })}
          </DropdownItem>
          <DropdownItem size="small" onClick={handleDeleteSelectedCountries}>
            {translate("pages.dashboard.delete_selected", {
              count: selectedCount,
            })}
          </DropdownItem>
          <DropdownItem size="small" onClick={clearSelection}>
            {translate("pages.dashboard.clear_selection", {
              count: selectedCount,
            })}
          </DropdownItem>
        </>
      )}
    </Dropdown>
  )
}

export default CountriesDashboardTableRowDropdown
