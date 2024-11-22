import { CountryFormValues } from "@/containers/forms/country-form/types"

export interface CreateCountryFormProps {
  onSuccess: () => void
}

export interface CreateCountryFormValues extends CountryFormValues {
  id: string
}
