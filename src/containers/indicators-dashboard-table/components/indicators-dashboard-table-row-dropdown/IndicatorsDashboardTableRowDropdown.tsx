import { FC } from "react"
import { useRouter } from "next/navigation"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import EditIndicatorModal from "@/containers/modals/edit-indicator-modal/EditIndicatorModal"
import IndicatorModal from "@/containers/modals/indicator-modal/IndicatorModal"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useMutation from "@/hooks/use-mutation/useMutation"
import { hideIndicators, exposeIndicators } from "@/api/indicator/update"
import { IndicatorsDashboardTableRowDropdownProps } from "./types"

const IndicatorsDashboardTableRowDropdown: FC<
  IndicatorsDashboardTableRowDropdownProps
> = ({ indicator, ...props }) => {
  const router = useRouter()

  const { selectedItems, selectedCount, clearSelection } = useContextStore()

  const { openModal } = useModal()

  const [, hideManyIndicators] = useMutation(hideIndicators)

  const [, exposeManyIndicators] = useMutation(exposeIndicators)

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
    await hideManyIndicators({ ids: selectedItems })
    router.refresh()
  }

  const handleExposeSelected = async () => {
    await exposeManyIndicators({ ids: selectedItems })
    router.refresh()
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
