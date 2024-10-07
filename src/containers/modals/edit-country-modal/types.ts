import { Country } from "@prisma/client"

export interface EditCountryModalProps {
  country: Country
  onSuccess?: (indicator: Partial<Country> & Pick<Country, "id">) => void
}
