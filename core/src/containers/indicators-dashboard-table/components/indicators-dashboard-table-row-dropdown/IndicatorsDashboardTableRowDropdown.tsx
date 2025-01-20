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
import translate from "@/modules/i18n"

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
    errorMessage: translate("errors.unexpected_error"),
  })

  const [, exposeManyIndicators] = useMutation(exposeIndicators, {
    onError: revert,
    errorMessage: translate("errors.unexpected_error"),
  })

  const [, deleteManyIndicators] = useMutation(deleteIndicators, {
    errorMessage: translate("errors.unexpected_error"),
    successMessage: translate(
      "pages.indicators_dashboard.deleted_successfully"
    ),
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
      title: translate("pages.indicators_dashboard.confirm_deletion", {
        id: indicator.id,
      }),
      subtitle: translate("pages.indicators_dashboard.deletion_unrevertable"),
      severity: "danger",
      onConfirm: async () => {
        await deleteManyIndicators([indicator.id])
        deleteStoreIndicators([indicator.id])
      },
    })
  }

  const handleDeleteSelectedIndicators = () => {
    openConfirm({
      title: translate("pages.indicators_dashboard.confirm_multiple_deletion", {
        count: selectedCount,
      }),
      subtitle: translate(
        "pages.indicators_dashboard.deletion_multiple_unrevertable"
      ),
      severity: "danger",
      onConfirm: async () => {
        await deleteManyIndicators(selectedItems)
        deleteStoreIndicators(selectedItems)
      },
    })
  }

  return (
    <Dropdown position="bottom-end" closeOneClick {...props}>
      <DropdownItem size="small" onClick={handleMoreIndicatorInformation}>
        {translate("pages.dashboard.more_info")}
      </DropdownItem>
      <DropdownItem size="small" onClick={handleEditIndicator}>
        {translate("pages.indicators_dashboard.edit_indicator")}
      </DropdownItem>
      <DropdownItem size="small" onClick={handleDeleteIndicator}>
        {translate("pages.indicators_dashboard.delete_indicator")}
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
          <DropdownItem size="small" onClick={handleDeleteSelectedIndicators}>
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

export default IndicatorsDashboardTableRowDropdown
