import { Indicator } from "@prisma/client"

export interface EditIndicatorModalProps {
  indicator: Indicator
  onSuccess?: (indicator: Partial<Indicator> & Pick<Indicator, "id">) => void
}
