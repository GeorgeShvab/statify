import { Value } from "@prisma/client"
import { ValueFormValues } from "@/containers/forms/value-form/types"

export interface EditValueFormProps {
  value: Value
  onSuccess: () => void
}

export type EditValueFormValues = ValueFormValues
