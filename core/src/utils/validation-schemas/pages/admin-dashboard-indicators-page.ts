import { getOptionsValues } from "@/utils/get-options-values/getOptionsValues"
import schema from "@/utils/validation-schemas/api/schema"
import { possibleSortDirections } from "@/constants/general"
import indicatorSelectOptions from "@/constants/select-options/indicatorSelectOptions"
import yup from "@/modules/yup"

const adminDashboardIndicatorsPageSchema = {
  searchParams: schema({
    search: yup.string().sanitize().replaceSpecialCharacters().default(""),
    status: yup
      .string()
      .oneOf(getOptionsValues(indicatorSelectOptions.status))
      .default("all"),
    sort: yup
      .string()
      .oneOf(getOptionsValues(indicatorSelectOptions.sort))
      .default("id"),
    sortDirection: yup.string().oneOf(possibleSortDirections).default("asc"),
  }),
}

export default adminDashboardIndicatorsPageSchema
