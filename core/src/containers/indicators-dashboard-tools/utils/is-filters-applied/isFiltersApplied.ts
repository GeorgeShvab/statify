import { IndicatorsDashboardToolsProps } from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools.types"
import indicatorSelectOptions from "@/constants/select-options/indicatorSelectOptions"

const isFiltersApplied = ({
  sort,
  search,
  status,
  sortDirection,
}: IndicatorsDashboardToolsProps) => {
  return (
    search ||
    sort !== indicatorSelectOptions.sort[0].value ||
    status !== indicatorSelectOptions.status[0].value ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
