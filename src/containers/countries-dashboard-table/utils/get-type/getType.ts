import { Country } from "@prisma/client"

// I will store those properties in a tuple in future
const getType = ({
  country,
  geographicRegion,
  union,
}: Pick<Country, "country" | "geographicRegion" | "union">) => {
  if (country) return "Country"
  if (geographicRegion) return "Region"
  if (union) return "Union"

  return "Other"
}

export default getType
