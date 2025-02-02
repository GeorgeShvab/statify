import { EditCountryFormValues } from "@/containers/forms/country-form/edit-country-form/types"
import { Country } from "@/types/country.types"

const getInitialValues = (country: Country): EditCountryFormValues => {
  return {
    ...country,
    searchTags: [],
    geoCode: "",
    iso2Code: "",
    type: "other",
    status: country.hidden ? "hidden" : "visible",
  }
}

export default getInitialValues
