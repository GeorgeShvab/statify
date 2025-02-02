import { DropdownProps } from "@/ui/dropdown/Dropdown.types"
import { Country } from "@/types/country.types"

export interface CountriesDashboardTableRowDropdownProps
  extends Pick<DropdownProps, "onClose" | "isOpen" | "anchor"> {
  country: Country
}
