export const indicatorSortOptions = [
  { value: "id", label: "ID" },
  { value: "label", label: "Label" },
  { value: "source", label: "Source" },
  { value: "dataset", label: "Dataset" },
  { value: "datapoints", label: "Datapoints" },
  { value: "createdAt", label: "Date of creation" },
  { value: "updatedAt", label: "Date of updation" },
]

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
]

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
]

export const searchQueryKey = "search"
export const sortQueryKey = "sort"
export const statusQueryKey = "status"
export const typeQueryKey = "type"