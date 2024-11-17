import { Country } from "@prisma/client"
import { DropdownProps } from "@/ui/dropdown/Dropdown.types"

export interface CountriesDashboardTableRowDropdownProps
  extends Pick<DropdownProps, "onClose" | "isOpen" | "anchor"> {
  country: Country
}
