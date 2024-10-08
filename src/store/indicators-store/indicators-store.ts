import { createStore } from "zustand"
import { IndicatorsStore } from "@/store/indicators-store/types"
import { IndicatorWithDatapoints } from "@/types/types"

const indicatorsStore = (initial: IndicatorWithDatapoints[]) => () =>
  createStore<IndicatorsStore>()((set) => ({
    indicators: initial,
    setIndicators: (indicators: IndicatorWithDatapoints[]) => {
      set({ indicators })
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
    updateIndicator: (indicator) =>
      set((state) => ({
        indicators: state.indicators.map((item) =>
          item.id === indicator.id ? { ...item, ...indicator } : item
        ),
      })),
    deleteIndicators: (ids) =>
      set((state) => ({
        indicators: state.indicators.filter((item) => !ids.includes(item.id)),
      })),
    backupData: [],
    backup: () => set((state) => ({ backupData: state.indicators })),
    revert: () =>
      set((state) => ({ indicators: state.backupData || state.indicators })),
  }))

export default indicatorsStore
