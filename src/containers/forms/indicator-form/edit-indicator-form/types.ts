import { Indicator } from "@prisma/client"
import { IndicatorFormValues } from "../types"

export interface EditIndicatorFormProps {
  indicator: Indicator
  onSuccess: () => void
}

export type EditIndicatorFormValues = IndicatorFormValues
