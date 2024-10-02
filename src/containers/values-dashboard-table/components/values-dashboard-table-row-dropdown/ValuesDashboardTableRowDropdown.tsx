import { FC } from "react"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import { ValuesDashboardTableRowDropdownProps } from "@/containers/values-dashboard-table/components/values-dashboard-table-row-dropdown/types"

const ValuesDashboardTableRowDropdown: FC<
  ValuesDashboardTableRowDropdownProps
> = ({ ...props }) => {
  // const { hideValues: hideStoreValues, exposeValues: exposeStoreValues } =
  //   useContextStore<StoreApi<ValuesStore>>()

  //const { openModal } = useModal()

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
    // openModal(<IndicatorModal indicator={indicator} />, {
    //   scrollable: true,
    // })
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
