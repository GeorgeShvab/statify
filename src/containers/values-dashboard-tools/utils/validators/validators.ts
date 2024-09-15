import {
  valueSortOptions,
  valueIndicatorOptions,
  valueCountryOptions,
} from "@/containers/values-dashboard-tools/constants"

export const validateCountry = (value: string | null) => {
  const isValid =
    value && valueCountryOptions.some((item) => item.value === value)

  if (isValid) return value
  return valueCountryOptions[0].value
}

export const validateIndicator = (value: string | null) => {
  const isValid =
    value && valueIndicatorOptions.some((item) => item.value === value)

  if (isValid) return value
  return valueIndicatorOptions[0].value
}

export const validateSort = (value: string | null) => {
  const isValid = value && valueSortOptions.some((item) => item.value === value)

  if (isValid) return value
  return valueSortOptions[0].value
}
