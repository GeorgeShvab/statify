import { IndicatorsDashboardToolsProps } from "../../IndicatorsDashboardTools.types"
import { indicatorSortOptions, indicatorStatusOptions } from "../../constants"

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
