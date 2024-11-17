import { EditableCountryFields } from "@/containers/forms/country-form/edit-country-form/types"
import { CountryFormValues } from "@/containers/forms/country-form/types"

const prepareData = <
  T = CountryFormValues,
  TRes extends EditableCountryFields = EditableCountryFields,
>(
  values: Partial<T>
) => {
  const res = (Object.keys(values) as (keyof T)[]).reduce((acc, curr) => {
    if (curr === "status") {
      return { ...acc, hidden: values[curr] === "hidden" ? true : false }
    } else if (curr === "searchTags") {
      if (values[curr]) return { ...acc, searchTags: values[curr] }
      return acc
    } else if (curr === "geoCode") {
      if (values[curr]) return { ...acc, geoCode: values[curr] }
      return acc
    } else if (curr === "iso2Code") {
      if (values[curr]) return { ...acc, iso2Code: values[curr] }
      return acc
    }

    return { ...acc, [curr]: values[curr] }
  }, {})

  return res as TRes
}

export default prepareData
