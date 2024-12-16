import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { getOptionsValues } from "@/utils/get-options-values/getOptionsValues"
import schema from "@/utils/validation-schemas/api/schema"
import { possibleSortDirections } from "@/constants/general"
import valueSelectOptions from "@/constants/select-options/valueSelectOptions"
import yup from "@/modules/yup"

type PossibleValueSortOptions = (typeof possibleValueSortOptions)[number]

const getPossibleValueCountryOptions = () =>
  CountryService.getSelectAutocomplete().then((res) => getOptionsValues(res))

const getPossibleValueIndicatorOptions = () =>
  IndicatorService.getSelectAutocomplete().then((res) => getOptionsValues(res))

const possibleValueSortOptions = getOptionsValues(valueSelectOptions.sort(true))

const adminDashboardValuesPageSchema = {
  searchParams: schema({
    country: yup.string().oneOf(getPossibleValueCountryOptions).default("all"),
    indicator: yup
      .string()
      .oneOf(getPossibleValueIndicatorOptions)
      .default("all"),
    sort: yup
      .string<PossibleValueSortOptions>()
      .when("indicator", {
        is: (value: string) => value === "all" || !value,
        then: (schema) =>
          schema.oneOf(getOptionsValues(valueSelectOptions.sort())),
        otherwise: (schema) => schema.oneOf(possibleValueSortOptions),
      })
      .default("id"),
    sortDirection: yup.string().oneOf(possibleSortDirections).default("asc"),
  }),
}

export default adminDashboardValuesPageSchema
