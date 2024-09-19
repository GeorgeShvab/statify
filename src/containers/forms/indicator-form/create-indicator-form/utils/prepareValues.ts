import { CreateIndicatorFormValues } from "../types"

const prepareValues = (values: CreateIndicatorFormValues) => {
  const result = (
    Object.keys(values) as (keyof CreateIndicatorFormValues)[]
  ).reduce((acc, curr) => {
    const currentValue = values[curr]

    if (Array.isArray(currentValue) && currentValue.length) {
      return { ...acc, [curr]: currentValue }
    }

    if (typeof currentValue === "string" && currentValue.trim()) {
      return { ...acc, [curr]: currentValue }
    }

    if (typeof currentValue === "boolean") {
      return { ...acc, [curr]: currentValue }
    }

    return acc
  }, {})

  return result as CreateIndicatorFormValues
}

export default prepareValues
