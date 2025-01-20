import { FC } from "react"
import { StoreApi } from "zustand"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import EditValueModal from "@/containers/modals/edit-value-modal/EditValueModal"
import ValueModal from "@/containers/modals/value-modal/ValueModal"
import { ValuesDashboardTableRowDropdownProps } from "@/containers/values-dashboard-table/components/values-dashboard-table-row-dropdown/types"
import { useConfirm } from "@/providers/confirm-provider/ConfirmProvider"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useMutation from "@/hooks/use-mutation/useMutation"
import { ValuesStore } from "@/store/values-store/types"
import { deleteValues } from "@/api/admin"
import translate from "@/modules/i18n"

const ValuesDashboardTableRowDropdown: FC<
  ValuesDashboardTableRowDropdownProps
> = ({ value, ...props }) => {
  const { selectedItems, selectedCount, clearSelection } =
    useSelectable<number>()

  const { updateValue, deleteValues: deleteStoreValues } =
    useContextStore<StoreApi<ValuesStore>>()

  const { openModal } = useModal()

  const { openConfirm } = useConfirm()

  const [, deleteManyValues] = useMutation(deleteValues, {
    errorMessage: translate("errors.unexpected_error"),
    successMessage: translate("pages.values_dashboard.deleted_successfully"),
  })

  const handleEditValue = () => {
    openModal(<EditValueModal onSuccess={updateValue} value={value} />, {
      scrollable: true,
    })
  }

  const handleMoreValueInformation = () => {
    openModal(<ValueModal value={value} />)
  }

  const handleDeleteValue = () => {
    openConfirm({
      title: translate("pages.values_dashboard.confirm_deletion", {
        id: value.id,
      }),
      subtitle: translate("common.unrevertable_action"),
      severity: "danger",
      onConfirm: async () => {
        await deleteManyValues([value.id])
        deleteStoreValues([value.id])
      },
    })
  }

  const handleDeleteValues = () => {
    openConfirm({
      title: translate("pages.values_dashboard.confirm_multiple_deletion", {
        count: selectedCount,
      }),
      subtitle: translate("common.unrevertable_action"),
      severity: "danger",
      onConfirm: async () => {
        await deleteManyValues(selectedItems)
        deleteStoreValues(selectedItems)
      },
    })
  }

  return (
    <Dropdown position="bottom-end" closeOneClick {...props}>
      <DropdownItem size="small" onClick={handleMoreValueInformation}>
        {translate("pages.dashboard.more_info")}
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditValue}>
        {translate("pages.values_dashboard.edit_value")}
      </DropdownItem>
      <DropdownItem size="small" onClick={handleDeleteValue}>
        {translate("pages.values_dashboard.delete_value")}
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem size="small" onClick={handleDeleteValues}>
            {translate("pages.dashboard.delete_selected", {
              values: selectedCount,
            })}
          </DropdownItem>
          <DropdownItem size="small" onClick={clearSelection}>
            {translate("pages.dashboard.clear_selection", {
              values: selectedCount,
            })}
          </DropdownItem>
        </>
      )}
    </Dropdown>
  )
}

export default ValuesDashboardTableRowDropdown
