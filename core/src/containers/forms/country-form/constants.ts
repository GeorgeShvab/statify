import countrySelectOptions from "@/constants/select-options/countrySelectOptions"

export const countryStatusOptions = countrySelectOptions.status.slice(1)

export const countryTypeOptions = countrySelectOptions.type.slice(1)

export const initialValues = {
  id: "",
  name: "",
  status: "hidden",
  type: "country",
}
