import {
  initialValueCountryOptions,
  initialValueIndicatorOptions,
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
    country !== initialValueCountryOptions.value ||
    indicator !== initialValueIndicatorOptions.value ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
