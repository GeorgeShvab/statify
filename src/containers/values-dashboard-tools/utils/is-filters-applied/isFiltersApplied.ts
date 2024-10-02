import {
  valueCountryOptions,
  valueIndicatorOptions,
  valueSortOptions,
} from "@/app/(admin)/admin/dashboard/values/constants"
import { ValuesDashboardToolsProps } from "@/containers/values-dashboard-tools/ValuesDashboardTools.types"

const isFiltersApplied = ({
  sort,
  indicator,
  country,
  sortDirection,
}: ValuesDashboardToolsProps) => {
  return (
    sort !== valueSortOptions[0].value ||
    country !== valueCountryOptions[0].value ||
    indicator !== valueIndicatorOptions[0].value ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
