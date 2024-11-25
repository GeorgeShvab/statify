import { AnyObject, StringSchema } from "yup"
import {
  initialValueCountryOptions,
  initialValueIndicatorOptions,
  possibleValueSortQueryParam,
  valueSortOptions,
  valueSpecialSortParams,
} from "@/app/(admin)/admin/dashboard/values/constants"
import { ValueSort } from "@/app/(admin)/admin/dashboard/values/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import schema from "@/utils/validation-schemas/schema"
import { defaultSelectValue, possibleSortOrders } from "@/constants/general"
import yup from "@/modules/yup"

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
      .string()
      .default(valueSortOptions[0].value)
      .test(function (value) {
        const possibleValues: string[] =
          this.parent.indicator === "all"
            ? valueSpecialSortParams
            : possibleValueSortQueryParam

        return possibleValues.includes(value)
      }) as unknown as StringSchema<ValueSort, AnyObject>,
    indicator: yup
      .string()
      .default(initialValueIndicatorOptions.value)
      .test(async (value) => {
        const allIndicators =
          await IndicatorService.getSelectAutocomplete().then((res) =>
            res.map(({ value }) => value)
          )

        const possibleValues = [defaultSelectValue, ...allIndicators]

        return possibleValues.includes(value)
      }),
    country: yup
      .string()
      .default(initialValueCountryOptions.value)
      .test(async (value) => {
        const allCountries = await CountryService.getSelectAutocomplete().then(
          (res) => res.map(({ value }) => value)
        )

        const possibleValues = [defaultSelectValue, ...allCountries]

        return possibleValues.includes(value)
      }),
    sortDirection: yup
      .string()
      .default(possibleSortOrders[0])
      .oneOf(possibleSortOrders),
    size: yup.number().default(1000),
    page: yup.number().default(0),
  }),
}

export const ValueValidationSchema = {
  get: getSchema,
  post: postSchema,
  patch: patchSchema,
}
