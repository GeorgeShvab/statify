import { Country } from "@prisma/client"
import { CountryFormValues } from "@/containers/forms/country-form/types"

export interface EditCountryFormProps {
  country: Country
  onSuccess?: (indicator: Partial<Country> & Pick<Country, "id">) => void
}

export type EditCountryFormValues = CountryFormValues

export type EditableCountryFields = Pick<
  Country,
  "name" | "geoCode" | "iso2Code" | "hidden" | "type" | "searchTags"
>
