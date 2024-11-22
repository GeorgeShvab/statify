import { Value } from "@prisma/client"

export interface EditValueModalProps {
  value: Value
  onSuccess?: (indicator: Partial<Value> & Pick<Value, "id">) => void
}
