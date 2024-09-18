import { Indicator } from "@prisma/client"

export interface UpdateIndicatorParams extends Partial<Indicator> {
  id: string
}
