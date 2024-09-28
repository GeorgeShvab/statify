import { IndicatorsDashboardToolsProps } from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools.types"
import {
  indicatorSortOptions,
  indicatorStatusOptions,
} from "@/containers/indicators-dashboard-tools/constants"

const isFiltersApplied = ({
  sort,
  search,
  status,
  sortDirection,
}: IndicatorsDashboardToolsProps) => {
  return (
    search ||
    sort !== indicatorSortOptions[0].value ||
    status !== indicatorStatusOptions[0].value ||
    sortDirection !== "asc"
  )
}

export default isFiltersApplied
