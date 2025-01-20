export default {
  sort: [
    { value: "id", label: "pages.indicators_dashboard.selects.sort.by_id" },
    {
      value: "label",
      label: "pages.indicators_dashboard.selects.sort.by_label",
    },
    {
      value: "datapoints",
      label: "pages.indicators_dashboard.selects.sort.by_datapoints",
    },
    {
      value: "updatedAt",
      label: "pages.indicators_dashboard.selects.sort.by_date_of_update",
    },
  ],
  status: [
    {
      value: "all",
      label: "pages.indicators_dashboard.selects.status.all",
    },
    {
      value: "visible",
      label: "pages.indicators_dashboard.selects.status.visible",
    },
    {
      value: "hidden",
      label: "pages.indicators_dashboard.selects.status.hidden",
    },
  ],
  type: [
    {
      value: "all",
      label: "pages.indicators_dashboard.selects.type.all",
    },
    {
      value: "absolute",
      label: "pages.indicators_dashboard.selects.type.absolute",
    },
    {
      value: "relative",
      label: "pages.indicators_dashboard.selects.type.relative",
    },
  ],
} as const
