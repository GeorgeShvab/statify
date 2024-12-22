export default {
  sort: [
    { value: "id", label: "ID" },
    { value: "label", label: "Label" },
    { value: "datapoints", label: "Datapoints" },
    { value: "updatedAt", label: "Date of update" },
  ],
  status: [
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
  ],
  type: [
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
  ],
} as const
