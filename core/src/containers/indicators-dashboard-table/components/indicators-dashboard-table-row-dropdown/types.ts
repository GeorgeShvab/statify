import { Indicator } from "@prisma/client"
import { DropdownProps } from "@/ui/dropdown/Dropdown.types"

export interface IndicatorsDashboardTableRowDropdownProps
  extends Pick<DropdownProps, "onClose" | "isOpen" | "anchor"> {
  indicator: Indicator
}
