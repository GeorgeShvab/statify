"use client"

import { FC } from "react"
import { DashboardValueQueryParams } from "@/app/(admin)/admin/dashboard/values/types"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import SortAscendingIcon from "@/ui/icons/SortAscendingIcon"
import SortDescendingIcon from "@/ui/icons/SortDescendingIcon"
import LoadableSelectWithSearch from "@/ui/select-with-search/components/loadable-select-with-search/LoadableSelectWithSearch"
import Select from "@/ui/select/Select"
import { Option } from "@/ui/select/Select.types"
import { ValuesDashboardToolsProps } from "@/containers/values-dashboard-tools/ValuesDashboardTools.types"
import isFiltersApplied from "@/containers/values-dashboard-tools/utils/is-filters-applied/isFiltersApplied"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import {
  getCountrySelectAutocomplete,
  getIndicatorSelectAutocomplete,
} from "@/api/admin"
import searchParamsKeys from "@/constants/searchParamsKeys"
import valueSelectOptions from "@/constants/select-options/valueSelectOptions"

const ValueDashboardTools: FC<ValuesDashboardToolsProps> = ({
  sort,
  sortDirection,
  indicator,
  country,
}) => {
  const [, setSearchParams, clearAllParams] =
    useQueryParams<DashboardValueQueryParams>()

  const handleSelectChange = (key: string) => (option: Option) => {
    // Since user can choose sort by year and value only with selected indicator
    // we need to make sure that if user already has selected value
    if (
      key === "indicator" &&
      option.value === "all" &&
      (sort === "year" || sort === "value")
    ) {
      setSearchParams(
        searchParamsKeys.sort,
        valueSortOptions[0].value,
        key,
        option.value
      )
    } else {
      setSearchParams(key, option.value)
    }
  }

  const renderSortLabel = ({ label }: Option) =>
    `Sort by ${label.toLowerCase()}`

  const handleSortDirectionChange = () => {
    setSearchParams(
      searchParamsKeys.sortDirection,
      sortDirection === "asc" ? "desc" : "asc"
    )
  }

  const sortIcon =
    sortDirection === "asc" ? <SortAscendingIcon /> : <SortDescendingIcon />

  const showClearFiltersButton = !isFiltersApplied({
    sortDirection,
    indicator,
    country,
    sort,
  })

  const valueSortOptions = valueSelectOptions.sort(
    Boolean(indicator !== "all" && indicator)
  )

  return (
    <div className="admin-dashboard-tools">
      <LoadableSelectWithSearch
        apiService={getIndicatorSelectAutocomplete}
        value={indicator}
        onChange={handleSelectChange(searchParamsKeys.indicator)}
        className="flex-grow"
        size="small"
      />
      <LoadableSelectWithSearch
        apiService={getCountrySelectAutocomplete}
        value={country}
        onChange={handleSelectChange(searchParamsKeys.country)}
        className="flex-30"
        size="small"
      />
      <Select
        options={valueSortOptions}
        value={sort}
        onChange={handleSelectChange(searchParamsKeys.sort)}
        renderSelectedLabel={renderSortLabel}
        className="flex-22-5"
        size="small"
      />
      <IconButton
        className="flex-static"
        color="light"
        onClick={handleSortDirectionChange}
      >
        {sortIcon}
      </IconButton>
      <IconButton
        onClick={clearAllParams}
        disabled={showClearFiltersButton}
        className="flex-static"
        color="light"
        aria-label="Clear filters"
        title="Clear filters"
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default ValueDashboardTools
