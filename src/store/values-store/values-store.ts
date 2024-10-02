import { Value } from "@prisma/client"
import { createStore } from "zustand"
import { ValuesStore } from "@/store/values-store/types"

const valuesStore = (initial: Value[]) => () =>
  createStore<ValuesStore>()((set) => ({
    values: initial,
    setValues: (values: Value[]) => {
      set(() => ({ values }))
    },
    hideValues: (ids: number[]) =>
      set((state) => ({
        values: state.values.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: true } : item
        ),
      })),
    exposeValues: (ids: number[]) =>
      set((state) => ({
        values: state.values.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: false } : item
        ),
      })),
  }))

export default valuesStore
