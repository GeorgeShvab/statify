import {
  countrySortOptions,
  countryStatusOptions,
  countryTypeOptions,
} from "@/containers/countries-dashboard-tools/constants"

export const validateType = (value: string | null) => {
  const isValid =
    value && countryTypeOptions.some((item) => item.value === value)

  if (isValid) return value
  return countryTypeOptions[0].value
}

export const validateStatus = (value: string | null) => {
  const isValid =
    value && countryStatusOptions.some((item) => item.value === value)

  if (isValid) return value
  return countryStatusOptions[0].value
}

export const validateSort = (value: string | null) => {
  const isValid =
    value && countrySortOptions.some((item) => item.value === value)

  if (isValid) return value
  return countrySortOptions[0].value
}
