import { Indicator } from "@prisma/client"

export interface IndicatorCardProps
  extends Pick<Indicator, "label" | "id" | "description" | "source"> {
  countryId?: string
  countryName?: string
}
