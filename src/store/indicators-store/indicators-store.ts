import { createStore } from "zustand"
import { IndicatorWithDatapoints } from "@/types/types"
import { IndicatorsStore } from "./types"

const indicatorsStore = (initial: IndicatorWithDatapoints[]) => () =>
  createStore<IndicatorsStore>()((set) => ({
    indicators: initial,
    setIndicators: (indicators: IndicatorWithDatapoints[]) => {
      set(() => ({ indicators }))
    },
    hideIndicators: (ids: string[]) =>
      set((state) => ({
        indicators: state.indicators.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: true } : item
        ),
      })),
    exposeIndicators: (ids: string[]) =>
      set((state) => ({
        indicators: state.indicators.map((item) =>
          ids.includes(item.id) ? { ...item, hidden: false } : item
        ),
      })),
  }))

export default indicatorsStore
