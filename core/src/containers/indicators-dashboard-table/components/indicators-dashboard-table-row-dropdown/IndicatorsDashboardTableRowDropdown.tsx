import { FC } from "react"
import { StoreApi } from "zustand"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import { IndicatorsDashboardTableRowDropdownProps } from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row-dropdown/types"
import EditIndicatorModal from "@/containers/modals/edit-indicator-modal/EditIndicatorModal"
import IndicatorModal from "@/containers/modals/indicator-modal/IndicatorModal"
import { useConfirm } from "@/providers/confirm-provider/ConfirmProvider"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useMutation from "@/hooks/use-mutation/useMutation"
import { IndicatorsStore } from "@/store/indicators-store/types"
import { hideIndicators, exposeIndicators, deleteIndicators } from "@/api/admin"

const IndicatorsDashboardTableRowDropdown: FC<
  IndicatorsDashboardTableRowDropdownProps
> = ({ indicator, ...props }) => {
  const { selectedItems, selectedCount, clearSelection } = useSelectable()
  const {
    hideIndicators: hideStoreIndicators,
    exposeIndicators: exposeStoreIndicators,
    deleteIndicators: deleteStoreIndicators,
    backup,
    revert,
    updateIndicator,
  } = useContextStore<StoreApi<IndicatorsStore>>()

  const { openModal } = useModal()
  const { openConfirm } = useConfirm()

  const [, hideManyIndicators] = useMutation(hideIndicators, {
    onError: revert,
    errorMessage: "Unexpected error occured",
  })

  const [, exposeManyIndicators] = useMutation(exposeIndicators, {
    onError: revert,
    errorMessage: "Unexpected error occured",
  })

  const [, deleteManyIndicators] = useMutation(deleteIndicators, {
    onError: revert,
    errorMessage: "Unexpected error occured",
    successMessage: "Indicators deleted",
  })

  const handleEditIndicator = () => {
    openModal(
      <EditIndicatorModal onSuccess={updateIndicator} indicator={indicator} />,
      {
        scrollable: true,
      }
    )
  }

  const handleMoreIndicatorInformation = () => {
    openModal(<IndicatorModal indicator={indicator} />, {
      scrollable: true,
    })
  }

  const handleHideSelected = async () => {
    backup()
    hideStoreIndicators(selectedItems)
    await hideManyIndicators({ ids: selectedItems })
  }

  const handleExposeSelected = async () => {
    backup()
    exposeStoreIndicators(selectedItems)
    await exposeManyIndicators({ ids: selectedItems })
  }

  const handleDeleteIndicator = () => {
    openConfirm({
      title: `Are you sure you want to delete indicator (${indicator.id})?`,
      subtitle:
        "This action can not be reverted. Associated with indicator values will be deleted too.",
      severity: "danger",
      onConfirm: () => {
        backup()
        deleteStoreIndicators([indicator.id])
        deleteManyIndicators([indicator.id])
      },
    })
  }

  const handleDeleteSelectedIndicators = () => {
    openConfirm({
      title: `Are you sure you want to delete selected indicators (${selectedCount})?`,
      subtitle:
        "This action can not be reverted. Associated with indicators values will be deleted too.",
      severity: "danger",
      onConfirm: () => {
        backup()
        deleteStoreIndicators(selectedItems)
        deleteManyIndicators(selectedItems)
      },
    })
  }

  return (
    <Dropdown position="bottom-end" closeOneClick {...props}>
      <DropdownItem size="small" onClick={handleMoreIndicatorInformation}>
        More Information
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditIndicator}>
        Edit Indicator
      </DropdownItem>
      <DropdownItem size="small" onClick={handleDeleteIndicator}>
        Delete Indicator
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem size="small" onClick={handleHideSelected}>
            Hide all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem size="small" onClick={handleExposeSelected}>
            Expose all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem size="small" onClick={handleDeleteSelectedIndicators}>
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

export default IndicatorsDashboardTableRowDropdown
