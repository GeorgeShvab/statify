import { ValuesDashboardToolsProps } from "@/containers/values-dashboard-tools/ValuesDashboardTools.types"
import valueSelectOptions from "@/constants/select-options/valueSelectOptions"

const isFiltersApplied = ({
  sort,
  indicator,
  country,
  sortDirection,
}: ValuesDashboardToolsProps) => {
  return (
    sort !== valueSelectOptions.sort()[0].value ||
    country !== "all" ||
    indicator !== "all" ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
