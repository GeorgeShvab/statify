"use client"

import Input from "@/ui/input/Input"
import Select from "@/ui/select/Select"
import { ChangeEvent, FC, useState } from "react"
import "@/containers/countries-dashboard-tools/styles.scss"
import { Option } from "@/ui/select/Select.types"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import {
  countrySortOptions,
  countryStatusOptions,
  countryTypeOptions,
  searchQueryKey,
  sortQueryKey,
  statusQueryKey,
  typeQueryKey,
} from "@/containers/countries-dashboard-tools/constants"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import { DashboardCountryQueryParams } from "@/containers/countries-dashboard-tools/CountriesDashboardTools.types"
import {
  validateSort,
  validateStatus,
  validateType,
} from "@/containers/countries-dashboard-tools/utils/validators/validators"

const CountryDashboardTools: FC = () => {
  const [searchParams, setSearchParams] =
    useQueryParams<DashboardCountryQueryParams>()

  const sortSearchParam = validateSort(searchParams.sort)
  const statusSearchParam = validateStatus(searchParams.status)
  const typeSearchParam = validateType(searchParams.type)
  const searchSearchParam = searchParams.search || ""

  const [searchValue, setSearchValue] = useState(searchSearchParam)

  const debouncedSetSearch = useDebounce(
    (value: string) => setSearchParams(searchQueryKey, value),
    300,
    [searchParams.sort, searchParams.status, searchParams.type]
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
        placeholder="Search by ID, name, geocode or iso2code..."
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Select
        options={countrySortOptions}
        value={sortSearchParam}
        onChange={handleSelectChange(sortQueryKey)}
        renderSelectedLabel={renderSortLabel}
        className="dashboard-tools__sort-select"
        size="small"
      />
      <Select
        options={countryStatusOptions}
        value={statusSearchParam}
        onChange={handleSelectChange(statusQueryKey)}
        className="dashboard-tools__select"
        size="small"
      />
      <Select
        options={countryTypeOptions}
        value={typeSearchParam}
        onChange={handleSelectChange(typeQueryKey)}
        className="dashboard-tools__region-type-select"
        size="small"
      />
    </div>
  )
}

export default CountryDashboardTools
