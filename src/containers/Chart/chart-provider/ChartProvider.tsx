"use client"

import React, { FC, createContext, useContext } from "react"
import useChartState from "@/containers/chart/hooks/use-chart-state/useChartState"
import { ChartProviderProps, type ChartContext } from "./ChartProvider.types"

const ChartContext = createContext<ChartContext>({
  data: [],
  shortening: 10000,
  setColor: () => {},
  selectRegion: () => {},
  unselectRegion: () => {},
  setRange: () => {},
  setSelectedRange: () => {},
  selectedRange: [0, 0],
  range: [],
})

const ChartProvider: FC<ChartProviderProps> = ({ children, regions }) => {
  const chartState = useChartState(regions)

  return (
    <ChartContext.Provider value={chartState}>{children}</ChartContext.Provider>
  )
}

export const useChart = () => {
  const chartData = useContext(ChartContext)

  if (!chartData) {
    throw new Error("useChart must be used within ChartProvider")
  }

  return chartData
}

export default ChartProvider
