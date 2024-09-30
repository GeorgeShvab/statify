import { Country } from "@prisma/client"

export interface EditCountryFormProps {
  country: Country
  onSuccess: () => void
}

export interface EditCountryFormValues {
  name: string
  geoCode?: string
  iso2Code?: string
  status: string
  type: string
  searchTags?: string[]
}
