import { FC } from "react"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import ValueModal from "@/containers/modals/value-modal/ValueModal"
import { ValuesDashboardTableRowDropdownProps } from "@/containers/values-dashboard-table/components/values-dashboard-table-row-dropdown/types"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const ValuesDashboardTableRowDropdown: FC<
  ValuesDashboardTableRowDropdownProps
> = ({ value, ...props }) => {
  // const { hideValues: hideStoreValues, exposeValues: exposeStoreValues } =
  //   useContextStore<StoreApi<ValuesStore>>()

  const { openModal } = useModal()

  // const [, hideManyIndicators] = useMutation(hideIndicators, {
  //   onError: () => exposeStoreIndicators(selectedItems),
  //   errorMessage: "Unexpected error occured",
  // })

  // const [, exposeManyIndicators] = useMutation(exposeIndicators, {
  //   onError: () => hideStoreIndicators(selectedItems),
  //   errorMessage: "Unexpected error occured",
  // })

  const handleEditIndicator = () => {
    // openModal(<EditIndicatorModal indicator={indicator} />, {
    //   scrollable: true,
    // })
  }

  const handleMoreIndicatorInformation = () => {
    openModal(<ValueModal value={value} />, {
      scrollable: true,
    })
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
        Edit Value
      </DropdownItem>
    </Dropdown>
  )
}

export default ValuesDashboardTableRowDropdown
