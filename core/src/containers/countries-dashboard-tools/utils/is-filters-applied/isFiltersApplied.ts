import { CountriesDashboardToolsProps } from "@/containers/countries-dashboard-tools/CountriesDashboardTools.types"
import countrySelectOptions from "@/constants/select-options/countrySelectOptions"

const isFiltersApplied = ({
  sort,
  search,
  status,
  sortDirection,
  type,
}: CountriesDashboardToolsProps) => {
  return (
    search ||
    sort !== countrySelectOptions.sort[0].value ||
    status !== countrySelectOptions.status[0].value ||
    type !== countrySelectOptions.type[0].value ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
