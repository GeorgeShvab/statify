import {
  indicatorSortOptions,
  indicatorStatusOptions,
  indicatorTypeOptions,
} from "@/containers/indicators-dashboard-tools/constants"

export const validateType = (value: string | null) => {
  const isValid =
    value && indicatorTypeOptions.some((item) => item.value === value)

  if (isValid) return value.toLocaleLowerCase()
  return indicatorTypeOptions[0].value
}

export const validateStatus = (value: string | null) => {
  const isValid =
    value && indicatorStatusOptions.some((item) => item.value === value)

  if (isValid) return value.toLocaleLowerCase()
  return indicatorStatusOptions[0].value
}

export const validateSort = (value: string | null) => {
  const isValid =
    value && indicatorSortOptions.some((item) => item.value === value)

  if (isValid) return value.toLocaleLowerCase()
  return indicatorSortOptions[0].value
}
