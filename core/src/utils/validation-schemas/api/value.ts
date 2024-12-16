import { getOptionsValues } from "@/utils/get-options-values/getOptionsValues"
import schema from "@/utils/validation-schemas/api/schema"
import { possibleSortDirections } from "@/constants/general"
import valueSelectOptions from "@/constants/select-options/valueSelectOptions"
import yup from "@/modules/yup"

type PossibleValueSortOptions = (typeof possibleValueSortOptions)[number]

const getPossibleValueCountryOptions = () =>
  valueSelectOptions.country().then((res) => getOptionsValues(res.data))

const getPossibleValueIndicatorOptions = () =>
  valueSelectOptions.indicator().then((res) => getOptionsValues(res.data))

const possibleValueSortOptions = getOptionsValues(valueSelectOptions.sort(true))

const patchSchema = {
  body: schema({
    value: yup.number(),
    countryId: yup.string().sanitize(),
    year: yup.number(),
    indicatorId: yup.string().sanitize(),
  }),
  params: schema({
    value: yup.number().required(),
  }),
}

const postSchema = {
  body: schema({
    value: yup.number().required(),
    countryId: yup.string().required().sanitize(),
    year: yup.number().required(),
    indicatorId: yup.string().required().sanitize(),
  }),
}

const getSchema = {
  searchParams: schema({
    sort: yup
      .string<PossibleValueSortOptions>()
      .when("indicator", {
        is: (value: string) => value === "all" || !value,
        then: (schema) =>
          schema.oneOf(getOptionsValues(valueSelectOptions.sort(true))),
        otherwise: (schema) => schema.oneOf(possibleValueSortOptions),
      })
      .default("id"),
    country: yup.string().oneOf(getPossibleValueCountryOptions).default("all"),
    indicator: yup
      .string()
      .oneOf(getPossibleValueIndicatorOptions)
      .default("all"),
    sortDirection: yup.string().oneOf(possibleSortDirections).default("asc"),
    size: yup.number().default(1000),
    page: yup.number().default(0),
  }),
}

export const ValueValidationSchema = {
  get: getSchema,
  post: postSchema,
  patch: patchSchema,
}
