import { FC } from "react"
import { StoreApi } from "zustand"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import { IndicatorsDashboardTableRowDropdownProps } from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row-dropdown/types"
import EditIndicatorModal from "@/containers/modals/edit-indicator-modal/EditIndicatorModal"
import IndicatorModal from "@/containers/modals/indicator-modal/IndicatorModal"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { useSelectable } from "@/providers/selectable-provider/SelectableProvider"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useMutation from "@/hooks/use-mutation/useMutation"
import { hideIndicators, exposeIndicators } from "@/api/indicator/update"
import { IndicatorsStore } from "@/store/indicators-store/types"

const IndicatorsDashboardTableRowDropdown: FC<
  IndicatorsDashboardTableRowDropdownProps
> = ({ indicator, ...props }) => {
  const { selectedItems, selectedCount, clearSelection } = useSelectable()
  const {
    hideIndicators: hideStoreIndicators,
    exposeIndicators: exposeStoreIndicators,
  } = useContextStore<StoreApi<IndicatorsStore>>()

  const { openModal } = useModal()

  const [, hideManyIndicators] = useMutation(hideIndicators, {
    onError: () => exposeStoreIndicators(selectedItems),
    errorMessage: "Unexpected error occured",
  })

  const [, exposeManyIndicators] = useMutation(exposeIndicators, {
    onError: () => hideStoreIndicators(selectedItems),
    errorMessage: "Unexpected error occured",
  })

  const handleEditIndicator = () => {
    openModal(<EditIndicatorModal indicator={indicator} />, {
      scrollable: true,
    })
  }

  const handleMoreIndicatorInformation = () => {
    openModal(<IndicatorModal indicator={indicator} />, {
      scrollable: true,
    })
  }

  const handleHideSelected = async () => {
    hideStoreIndicators(selectedItems)
    await hideManyIndicators({ ids: selectedItems })
  }

  const handleExposeSelected = async () => {
    exposeStoreIndicators(selectedItems)
    await exposeManyIndicators({ ids: selectedItems })
  }

  return (
    <Dropdown position="bottom-end" closeOneClick {...props}>
      <DropdownItem
        className="indicator-options-dropdown__item"
        size="small"
        onClick={handleMoreIndicatorInformation}
      >
        More Information
      </DropdownItem>
      <DropdownItem
        className="indicator-options-dropdown__item"
        size="small"
        onClick={handleEditIndicator}
      >
        Update Indicator
      </DropdownItem>
      {selectedCount > 0 && (
        <>
          <DropdownItem
            className="indicator-options-dropdown__item"
            size="small"
            onClick={handleHideSelected}
          >
            Hide all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem
            className="indicator-options-dropdown__item"
            size="small"
            onClick={handleExposeSelected}
          >
            Expose all selected ({selectedCount})
          </DropdownItem>
          <DropdownItem
            className="indicator-options-dropdown__item"
            size="small"
            onClick={clearSelection}
          >
            Clear selection ({selectedCount})
          </DropdownItem>
        </>
      )}
    </Dropdown>
  )
}

export default IndicatorsDashboardTableRowDropdown
