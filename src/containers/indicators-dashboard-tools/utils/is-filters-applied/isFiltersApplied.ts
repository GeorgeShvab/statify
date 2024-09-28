import {
  indicatorSortOptions,
  indicatorStatusOptions,
} from "@/app/(admin)/admin/dashboard/indicators/constants"
import { IndicatorsDashboardToolsProps } from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools.types"

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
