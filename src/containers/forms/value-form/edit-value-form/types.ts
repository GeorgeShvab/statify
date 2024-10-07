import { Value } from "@prisma/client"
import { ValueFormValues } from "@/containers/forms/value-form/types"

export interface EditValueFormProps {
  value: Value
  onSuccess?: (indicator: Partial<Value> & Pick<Value, "id">) => void
}

export type EditValueFormValues = ValueFormValues
