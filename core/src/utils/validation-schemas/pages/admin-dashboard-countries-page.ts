import { getOptionsValues } from "@/utils/get-options-values/getOptionsValues"
import schema from "@/utils/validation-schemas/api/schema"
import { possibleSortDirections } from "@/constants/general"
import countrySelectOptions from "@/constants/select-options/countrySelectOptions"
import yup from "@/modules/yup"

const adminDashboardCountriesPageSchema = {
  searchParams: schema({
    search: yup.string().sanitize().replaceSpecialCharacters().default(""),
    status: yup
      .string()
      .oneOf(getOptionsValues(countrySelectOptions.status))
      .default("all"),
    sort: yup
      .string()
      .oneOf(getOptionsValues(countrySelectOptions.sort))
      .default("id"),
    sortDirection: yup.string().oneOf(possibleSortDirections).default("asc"),
    type: yup
      .string()
      .oneOf(getOptionsValues(countrySelectOptions.type))
      .default("all"),
  }),
}

export default adminDashboardCountriesPageSchema
