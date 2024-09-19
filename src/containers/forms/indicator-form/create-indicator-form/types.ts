import { IndicatorFormValues } from "../types"

export interface CreateIndicatorFormProps {
  onSuccess: () => void
}

export interface CreateIndicatorFormValues extends IndicatorFormValues {
  id: string
}
