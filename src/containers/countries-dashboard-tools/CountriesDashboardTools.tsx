"use client"

import Input from "@/ui/input/Input"
import Select from "@/ui/select/Select"
import { ChangeEvent, FC, useState } from "react"
import "@/containers/indicators-dashboard-tools/styles.scss"
import { Option } from "@/ui/select/Select.types"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import {
  indicatorSortOptions,
  indicatorStatusOptions,
  indicatorTypeOptions,
  searchQueryKey,
  sortQueryKey,
  statusQueryKey,
  typeQueryKey,
} from "@/containers/indicators-dashboard-tools/constants"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import { DashboardIndicatorQueryParams } from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools.types"
import {
  validateSort,
  validateStatus,
  validateType,
} from "@/containers/indicators-dashboard-tools/utils/validators/validators"

const IndicatorsDashboardTools: FC = () => {
  const [searchParams, setSearchParams] =
    useQueryParams<DashboardIndicatorQueryParams>()

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
        options={indicatorSortOptions}
        value={sortSearchParam}
        onChange={handleSelectChange(sortQueryKey)}
        renderSelectedLabel={renderSortLabel}
        className="dashboard-tools__sort-select"
        itemProps={{ className: "dashboard-tools__select-item" }}
      />
      <Select
        options={indicatorStatusOptions}
        value={statusSearchParam}
        onChange={handleSelectChange(statusQueryKey)}
        className="dashboard-tools__select"
        itemProps={{ className: "dashboard-tools__select-item" }}
      />
      <Select
        options={indicatorTypeOptions}
        value={typeSearchParam}
        onChange={handleSelectChange(typeQueryKey)}
        className="dashboard-tools__select"
        itemProps={{ className: "dashboard-tools__select-item" }}
      />
    </div>
  )
}

export default IndicatorsDashboardTools
