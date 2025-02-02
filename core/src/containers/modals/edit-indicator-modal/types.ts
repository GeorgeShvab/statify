import { Indicator } from "@/types/indicator.types"

export interface EditIndicatorModalProps {
  indicator: Indicator
  onSuccess?: (indicator: Partial<Indicator> & Pick<Indicator, "id">) => void
}
