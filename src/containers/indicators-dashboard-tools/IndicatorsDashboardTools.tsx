"use client"

import Input from "@/ui/input/Input"
import Select from "@/ui/select/Select"
import { ChangeEvent, FC, useState } from "react"
import "@/containers/indicators-dashboard-tools/styles.scss"
import { Option } from "@/ui/select/Select.types"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"
import { IndicatorsDashboardToolsProps } from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools.types"
import {
  indicatorSearchQueryKey,
  indicatorSortQueryKey,
  indicatorStatusQueryKey,
  indicatorTypeQueryKey,
  indicatorSortOptions,
  indicatorStatusOptions,
  indicatorTypeOptions,
} from "@/app/(admin)/admin/dashboard/indicators/constants"
import { DashboardIndicatorQueryParams } from "@/app/(admin)/admin/dashboard/indicators/types"

const IndicatorsDashboardTools: FC<IndicatorsDashboardToolsProps> = ({
  sort,
  search,
  status,
  type,
}) => {
  const [_, setSearchParams] = useQueryParams<DashboardIndicatorQueryParams>()

  const [searchValue, setSearchValue] = useState(search)

  const debouncedSetSearch = useDebounce(
    (value: string) => setSearchParams(indicatorSearchQueryKey, value),
    750,
    [sort, status, type]
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
        placeholder="Search by ID, name or description..."
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Select
        options={indicatorStatusOptions}
        value={status}
        onChange={handleSelectChange(indicatorStatusQueryKey)}
        className="dashboard-tools__select"
        size="small"
      />
      <Select
        options={indicatorTypeOptions}
        value={type}
        onChange={handleSelectChange(indicatorTypeQueryKey)}
        className="dashboard-tools__select"
        size="small"
      />
      <Select
        options={indicatorSortOptions}
        value={sort}
        onChange={handleSelectChange(indicatorSortQueryKey)}
        renderSelectedLabel={renderSortLabel}
        className="dashboard-tools__sort-select"
        size="small"
      />
    </div>
  )
}

export default IndicatorsDashboardTools
