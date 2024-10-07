import { Value } from "@prisma/client"

export interface ValuesStore {
  values: Value[]
  setValues: (values: Value[]) => void
  hideValues: (ids: number[]) => void
  exposeValues: (ids: number[]) => void
  updateValue: (value: Partial<Value> & Pick<Value, "id">) => void
  deleteValues: (id: number[]) => void
  backupData: Value[]
  backup: () => void
  revert: () => void
}
