import { Value } from "@prisma/client"

export interface ValuesStore {
  values: Value[]
  setValues: (values: Value[]) => void
  hideValues: (ids: number[]) => void
  exposeValues: (ids: number[]) => void
}
