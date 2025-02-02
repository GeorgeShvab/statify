import { DropdownProps } from "@/ui/dropdown/Dropdown.types"
import { Indicator } from "@/types/indicator.types"

export interface IndicatorsDashboardTableRowDropdownProps
  extends Pick<DropdownProps, "onClose" | "isOpen" | "anchor"> {
  indicator: Indicator
}
