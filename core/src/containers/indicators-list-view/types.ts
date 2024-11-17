import { ReactNode } from "react"
import { IndicatorCardProps } from "@/components/indicator-card/types"

export interface IndicatorsListViewProps {
  text: ReactNode
  data?: IndicatorCardProps[]
  fallback: ReactNode
  pages?: number
  page?: number
}

export interface IndicatorsListViewLoaderProps {
  text: string
}
