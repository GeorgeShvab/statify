"use client"

import { ChangeEvent, FC, useState } from "react"
import { DashboardIndicatorQueryParams } from "@/app/(admin)/admin/dashboard/indicators/types"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import SortAscendingIcon from "@/ui/icons/SortAscendingIcon"
import SortDescendingIcon from "@/ui/icons/SortDescendingIcon"
import Input from "@/ui/input/Input"
import Select from "@/ui/select/Select"
import { Option } from "@/ui/select/Select.types"
import { IndicatorsDashboardToolsProps } from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools.types"
import isFiltersApplied from "@/containers/indicators-dashboard-tools/utils/is-filters-applied/isFiltersApplied"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import searchParamsKeys from "@/constants/searchParamsKeys"
import indicatorSelectOptions from "@/constants/select-options/indicatorSelectOptions"
import translate, { TranslationMessage } from "@/modules/i18n"

const IndicatorsDashboardTools: FC<IndicatorsDashboardToolsProps> = ({
  sort,
  search,
  status,
  sortDirection,
}) => {
  const [, setSearchParams, clearAllParams] =
    useQueryParams<DashboardIndicatorQueryParams>()

  const [searchValue, setSearchValue] = useState(search)

  const debouncedSetSearch = useDebounce(
    (value: string) => setSearchParams(searchParamsKeys.search, value),
    750,
    [sort, status]
  )

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedSetSearch(value.trim())
  }

  const handleSelectChange = (key: string) => (option: Option) => {
    setSearchParams(key, option.value)
  }

  const nextSortDirection = sortDirection === "asc" ? "desc" : "asc"

  const handleSortDirectionChange = () => {
    setSearchParams(searchParamsKeys.sortDirection, nextSortDirection)
  }

  const renderSortLabel = ({ label }: Option) =>
    translate("common.sort_by", {
      value: translate(label as TranslationMessage).toLowerCase(),
    })

  const sortIcon =
    sortDirection === "asc" ? <SortAscendingIcon /> : <SortDescendingIcon />

  const showClearFiltersButton = !isFiltersApplied({
    search,
    status,
    sort,
    sortDirection,
  })

  return (
    <div className="admin-dashboard-tools" data-testid="admin-dashboard-tools">
      <Input
        className="flex-grow"
        placeholder={translate("pages.indicators_dashboard.search_placeholder")}
        data-testid="admin-dashboard-search-field"
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Select
        options={indicatorSelectOptions.status}
        value={status}
        onChange={handleSelectChange(searchParamsKeys.status)}
        data-testid="admin-dashboard-status-select"
        className="flex-22-5"
        size="small"
      />
      <Select
        options={indicatorSelectOptions.sort}
        value={sort}
        onChange={handleSelectChange(searchParamsKeys.sort)}
        renderSelectedLabel={renderSortLabel}
        data-testid="admin-dashboard-sort-select"
        className="flex-22-5"
        size="small"
      />
      <IconButton
        color="light"
        onClick={handleSortDirectionChange}
        data-testid="admin-dashboard-sort-direction-button"
        data-current-direction={sortDirection}
        data-next-direction={nextSortDirection}
      >
        {sortIcon}
      </IconButton>
      <IconButton
        onClick={clearAllParams}
        disabled={showClearFiltersButton}
        color="light"
        data-testid="admin-dashboard-clear-filters"
        aria-label={translate("pages.dashboard.clear_filters")}
        title={translate("pages.dashboard.clear_filters")}
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default IndicatorsDashboardTools
