"use client"

import Input from "@/ui/input/Input"
import Select from "@/ui/select/Select"
import { ChangeEvent, FC, useState } from "react"
import "@/containers/values-dashboard-tools/styles.scss"
import { Option } from "@/ui/select/Select.types"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import {
  valueSortOptions,
  valueIndicatorOptions,
  valueCountryOptions,
  searchQueryKey,
  sortQueryKey,
  countryQueryKey,
  indicatorQueryKey,
} from "@/containers/values-dashboard-tools/constants"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import { DashboardValueQueryParams } from "@/containers/values-dashboard-tools/ValuesDashboardTools.types"
import {
  validateSort,
  validateCountry,
  validateIndicator,
} from "@/containers/values-dashboard-tools/utils/validators/validators"
import SelectWithSearch from "@/ui/select-with-search/SelectWithSearch"

const ValueDashboardTools: FC = () => {
  const [searchParams, setSearchParams] =
    useQueryParams<DashboardValueQueryParams>()

  const sortSearchParam = validateSort(searchParams.sort)
  const countrySearchParam = validateCountry(searchParams.country)
  const indicatorSearchParam = validateIndicator(searchParams.indicator)
  const searchSearchParam = searchParams.search || ""

  const [searchValue, setSearchValue] = useState(searchSearchParam)

  const debouncedSetSearch = useDebounce(
    (value: string) => setSearchParams(searchQueryKey, value),
    300,
    [searchParams.sort, searchParams.country, searchParams.indicator]
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

  return (
    <div className="dashboard-tools">
      <Input
        className="dashboard-tools__searchbar"
        placeholder="Search by ID, country or indicator"
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Select
        options={valueSortOptions}
        value={sortSearchParam}
        onChange={handleSelectChange(sortQueryKey)}
        renderSelectedLabel={renderSortLabel}
        className="dashboard-tools__sort-select"
        size="small"
      />
      <SelectWithSearch
        options={valueIndicatorOptions}
        value={indicatorSearchParam}
        onChange={handleSelectChange(indicatorQueryKey)}
        className="dashboard-tools__region-select"
        size="small"
      />
      <SelectWithSearch
        options={valueCountryOptions}
        value={countrySearchParam}
        onChange={handleSelectChange(countryQueryKey)}
        className="dashboard-tools__indicator-select"
        size="small"
      />
    </div>
  )
}

export default ValueDashboardTools
