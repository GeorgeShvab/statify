import { Indicator } from "@prisma/client"
import { IndicatorFormValues } from "@/containers/forms/indicator-form/types"

export interface EditIndicatorFormProps {
  indicator: Indicator
  onSuccess: () => void
}

export type EditIndicatorFormValues = IndicatorFormValues
