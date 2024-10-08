"use client"

import { ChangeEvent, FC, useState } from "react"
import {
  countrySearchQueryKey,
  countrySortDirectionQueryKey,
  countrySortOptions,
  countrySortQueryKey,
  countryStatusOptions,
  countryStatusQueryKey,
  countryTypeOptions,
  countryTypeQueryKey,
} from "@/app/(admin)/admin/dashboard/countries/constants"
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
    (value: string) => setSearchParams(countrySearchQueryKey, value),
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
    search,
    status,
    sort,
    sortDirection,
    type,
  })

  return (
    <div className="admin-dashboard-tools">
      <Input
        className="flex-grow"
        placeholder="Search by ID, name, geocode or iso2code..."
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Select
        options={countryStatusOptions}
        value={status}
        onChange={handleSelectChange(countryStatusQueryKey)}
        className="flex-15"
        size="small"
      />
      <Select
        options={countryTypeOptions}
        value={type}
        onChange={handleSelectChange(countryTypeQueryKey)}
        className="flex-15"
        size="small"
      />
      <Select
        options={countrySortOptions}
        value={sort}
        onChange={handleSelectChange(countrySortQueryKey)}
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

export default CountriesDashboardTools
