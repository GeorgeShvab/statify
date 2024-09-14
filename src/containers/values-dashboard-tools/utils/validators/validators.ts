import {
  valueSortOptions,
  valueStatusOptions,
  valueTypeOptions,
} from "@/containers/values-dashboard-tools/constants"

export const validateType = (value: string | null) => {
  const isValid = value && valueTypeOptions.some((item) => item.value === value)

  if (isValid) return value
  return valueTypeOptions[0].value
}

export const validateStatus = (value: string | null) => {
  const isValid =
    value && valueStatusOptions.some((item) => item.value === value)

  if (isValid) return value
  return valueStatusOptions[0].value
}

export const validateSort = (value: string | null) => {
  const isValid = value && valueSortOptions.some((item) => item.value === value)

  if (isValid) return value
  return valueSortOptions[0].value
}
