import {
  countrySortOptions,
  countryStatusOptions,
  countryTypeOptions,
} from "@/app/(admin)/admin/dashboard/countries/constants"
import { CountriesDashboardToolsProps } from "../../CountriesDashboardTools.types"

const isFiltersApplied = ({
  sort,
  search,
  status,
  sortDirection,
  type,
}: CountriesDashboardToolsProps) => {
  return (
    search ||
    sort !== countrySortOptions[0].value ||
    status !== countryStatusOptions[0].value ||
    type !== countryTypeOptions[0].value ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
