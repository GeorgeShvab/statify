import { IndicatorFormValues } from "@/containers/forms/indicator-form/types"

export interface CreateIndicatorFormProps {
  onSuccess: () => void
}

export interface CreateIndicatorFormValues extends IndicatorFormValues {
  id: string
}
