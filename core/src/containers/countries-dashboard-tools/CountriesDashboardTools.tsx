"use client"

import { ChangeEvent, FC, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import CloseIcon from "@/ui/icons/CloseIcon"
import SortAscendingIcon from "@/ui/icons/SortAscendingIcon"
import SortDescendingIcon from "@/ui/icons/SortDescendingIcon"
import Input from "@/ui/input/Input"
import Select from "@/ui/select/Select"
import { Option } from "@/ui/select/Select.types"
import {
  CountriesDashboardToolsProps,
  DashboardCountryQueryParams,
} from "@/containers/countries-dashboard-tools/CountriesDashboardTools.types"
import isFiltersApplied from "@/containers/countries-dashboard-tools/utils/is-filters-applied/isFiltersApplied"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import searchParamsKeys from "@/constants/searchParamsKeys"
import countrySelectOptions from "@/constants/select-options/countrySelectOptions"
import translate, { TranslationMessage } from "@/modules/i18n"

const CountriesDashboardTools: FC<CountriesDashboardToolsProps> = ({
  search,
  sort,
  sortDirection,
  status,
  type,
}) => {
  const [, setSearchParams, clearAllParams] =
    useQueryParams<DashboardCountryQueryParams>()

  const [searchValue, setSearchValue] = useState(search)

  const debouncedSetSearch = useDebounce(
    (value: string) => setSearchParams(searchParamsKeys.search, value),
    300,
    [type, sort, sortDirection, status]
  )

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedSetSearch(value)
  }

  const handleSelectChange = (key: string) => (option: Option) => {
    setSearchParams(key, option.value)
  }

  const renderSortLabel = ({ label }: Option) =>
    translate("common.sort_by", {
      value: translate(label as TranslationMessage).toLowerCase(),
    })

  const nextSortDirection = sortDirection === "asc" ? "desc" : "asc"

  const handleSortDirectionChange = () => {
    setSearchParams(searchParamsKeys.sortDirection, nextSortDirection)
  }

  const sortIcon =
    sortDirection === "asc" ? <SortAscendingIcon /> : <SortDescendingIcon />

  const showClearFiltersButton = !isFiltersApplied({
    search,
    status,
    sort,
    sortDirection,
    type,
  })

  return (
    <div className="admin-dashboard-tools" data-testid="admin-dashboard-tools">
      <Input
        className="flex-grow"
        placeholder={translate("pages.countries_dashboard.search_placeholder")}
        data-testid="admin-dashboard-search-field"
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Select
        options={countrySelectOptions.status}
        value={status}
        onChange={handleSelectChange(searchParamsKeys.status)}
        data-testid="admin-dashboard-status-select"
        className="flex-15"
        size="small"
      />
      <Select
        options={countrySelectOptions.type}
        value={type}
        onChange={handleSelectChange(searchParamsKeys.type)}
        data-testid="admin-dashboard-type-select"
        className="flex-15"
        size="small"
      />
      <Select
        options={countrySelectOptions.sort}
        value={sort}
        onChange={handleSelectChange(searchParamsKeys.sort)}
        renderSelectedLabel={renderSortLabel}
        data-testid="admin-dashboard-sort-select"
        className="flex-22-5"
        size="small"
      />
      <IconButton
        color="light"
        data-testid="admin-dashboard-sort-direction-button"
        onClick={handleSortDirectionChange}
        data-current-direction={sortDirection}
        data-next-direction={nextSortDirection}
      >
        {sortIcon}
      </IconButton>
      <IconButton
        onClick={clearAllParams}
        disabled={showClearFiltersButton}
        color="light"
        aria-label={translate("pages.dashboard.clear_filters")}
        data-testid="admin-dashboard-clear-filters"
        title={translate("pages.dashboard.clear_filters")}
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default CountriesDashboardTools
