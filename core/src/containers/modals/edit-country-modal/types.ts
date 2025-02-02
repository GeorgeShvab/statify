import { Country } from "@/types/country.types"

export interface EditCountryModalProps {
  country: Country
  onSuccess?: (indicator: Partial<Country> & Pick<Country, "id">) => void
}
