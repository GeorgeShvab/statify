import { Indicator } from "@prisma/client"

export interface UpdateIndicatorParams extends Partial<Indicator> {
  id: string
}

export interface CreateIndicatorParams extends Partial<Indicator> {
  id: string
  label: string
  hidden: boolean
  absolute: boolean
  showChart: boolean
  precision: number
  ranking: number
}
