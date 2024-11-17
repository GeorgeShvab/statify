import { Value } from "@prisma/client"
import { DropdownProps } from "@/ui/dropdown/Dropdown.types"

export interface ValuesDashboardTableRowDropdownProps
  extends Pick<DropdownProps, "onClose" | "isOpen" | "anchor"> {
  value: Value
}
