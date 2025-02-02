import { IndicatorFormValues } from "@/containers/forms/indicator-form/types"
import { Indicator } from "@/types/indicator.types"

export interface EditIndicatorFormProps {
  indicator: Indicator
  onSuccess: (indicator: Partial<Indicator> & Pick<Indicator, "id">) => void
}

export type EditIndicatorFormValues = IndicatorFormValues
