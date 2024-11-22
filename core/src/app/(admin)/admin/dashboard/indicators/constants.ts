export const indicatorSearchQueryKey = "search"
export const indicatorSortQueryKey = "sort"
export const indicatorStatusQueryKey = "status"
export const indicatorTypeQueryKey = "type"
export const indicatorSortDirectionQueryKey = "sortDirection"

export const indicatorSortOptions = [
  { value: "id", label: "ID" },
  { value: "label", label: "Label" },
  { value: "datapoints", label: "Datapoints" },
  { value: "updatedAt", label: "Date of updation" },
] as const

export const possibleIndicatorSortQueryParam = indicatorSortOptions.map(
  (item) => item.value
)

export const indicatorStatusOptions = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "visible",
    label: "Visible",
  },
  {
    value: "hidden",
    label: "Hidden",
  },
] as const

export const possibleIndicatorStatusQueryParam = indicatorStatusOptions.map(
  (item) => item.value
)

export const indicatorTypeOptions = [
  {
    value: "all",
    label: "All types",
  },
  {
    value: "absolute",
    label: "Absolute",
  },
  {
    value: "relative",
    label: "Relative",
  },
] as const

export const possibleIndicatorTypeQueryParam = indicatorTypeOptions.map(
  (item) => item.value
)

export const possibleIndicatorSortDirection = ["asc", "desc"] as const
