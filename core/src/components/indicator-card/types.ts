import { Indicator } from "@/types/indicator.types"

export interface IndicatorCardProps
  extends Pick<Indicator, "label" | "id" | "description" | "source"> {
  countryId?: string
  countryName?: string
}
