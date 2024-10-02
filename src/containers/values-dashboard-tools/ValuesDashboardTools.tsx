"use client"

import { FC } from "react"
import { countrySortDirectionQueryKey } from "@/app/(admin)/admin/dashboard/countries/constants"
import {
  valueCountryOptions,
  valueCountryQueryKey,
  valueIndicatorOptions,
  valueIndicatorQueryKey,
  valueSortOptions,
  valueSortQueryKey,
} from "@/app/(admin)/admin/dashboard/values/constants"
import { DashboardValueQueryParams } from "@/app/(admin)/admin/dashboard/values/types"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import SortAscendingIcon from "@/ui/icons/SortAscendingIcon"
import SortDescendingIcon from "@/ui/icons/SortDescendingIcon"
import SelectWithSearch from "@/ui/select-with-search/SelectWithSearch"
import Select from "@/ui/select/Select"
import { Option } from "@/ui/select/Select.types"
import { ValuesDashboardToolsProps } from "@/containers/values-dashboard-tools/ValuesDashboardTools.types"
import isFiltersApplied from "@/containers/values-dashboard-tools/utils/is-filters-applied/isFiltersApplied"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"

const ValueDashboardTools: FC<ValuesDashboardToolsProps> = ({
  sort,
  sortDirection,
  indicator,
  country,
}) => {
  const [, setSearchParams, clearAllParams] =
    useQueryParams<DashboardValueQueryParams>()

  const handleSelectChange = (key: string) => (option: Option) => {
    setSearchParams(key, option.value)
  }

  const renderSortLabel = ({ label }: Option) =>
    `Sort by ${label.toLowerCase()}`

  const handleSortDirectionChange = () => {
    setSearchParams(
      countrySortDirectionQueryKey,
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

  return (
    <div className="admin-dashboard-tools">
      <SelectWithSearch
        options={valueIndicatorOptions}
        value={indicator}
        onChange={handleSelectChange(valueIndicatorQueryKey)}
        className="flex-grow"
        size="small"
      />
      <SelectWithSearch
        options={valueCountryOptions}
        value={country}
        onChange={handleSelectChange(valueCountryQueryKey)}
        className="flex-grow"
        size="small"
      />
      <Select
        options={valueSortOptions}
        value={sort}
        onChange={handleSelectChange(valueSortQueryKey)}
        renderSelectedLabel={renderSortLabel}
        className="flex-22-5"
        size="small"
      />
      <IconButton color="light" onClick={handleSortDirectionChange}>
        {sortIcon}
      </IconButton>
      <IconButton
        onClick={clearAllParams}
        disabled={showClearFiltersButton}
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
