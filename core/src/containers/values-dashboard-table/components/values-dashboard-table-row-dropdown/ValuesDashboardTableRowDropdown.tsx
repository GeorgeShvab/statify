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
    errorMessage: "Unexpected error occured",
    successMessage: "Values deleted",
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
      title: `Are you sure you want to delete value (${value.id})?`,
      subtitle: "This action can not be reverted.",
      severity: "danger",
      onConfirm: async () => {
        await deleteManyValues([value.id])
        deleteStoreValues([value.id])
      },
    })
  }

  const handleDeleteValues = () => {
    openConfirm({
      title: `Are you sure you want to delete selected values (${selectedCount})?`,
      subtitle: "This action can not be reverted.",
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
        More Information
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditValue}>
        Edit Value
      </DropdownItem>
      <DropdownItem size="small" onClick={handleDeleteValue}>
        Delete Value
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem size="small" onClick={handleDeleteValues}>
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

export default ValuesDashboardTableRowDropdown
