export default {
  sort: [
    { value: "id", label: "ID" },
    { value: "name", label: "Name" },
    { value: "geoCode", label: "GeoCode" },
    { value: "iso2Code", label: "Iso2Code" },
    { value: "datapoints", label: "Datapoints" },
    { value: "updatedAt", label: "Date of updation" },
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
      value: "country",
      label: "Country",
    },
    {
      value: "union",
      label: "Union",
    },
    {
      value: "region",
      label: "Region",
    },
    {
      value: "other",
      label: "Other",
    },
  ],
} as const
