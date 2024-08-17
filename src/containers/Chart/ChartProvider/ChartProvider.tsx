'use client'

import React, { FC, createContext, useContext } from 'react'
import useChartState from '@/containers/Chart/hooks/useChartState/useChartState'
import { ChartProviderProps, type ChartContext } from './ChartProvider.types'

const ChartContext = createContext<ChartContext>({
  isLimitError: false,
  data: [],
  shortening: 10000,
  setColor: () => {},
  selectRegion: () => {},
  unselectRegion: () => {},
  toggleRegionSelection: () => {}
})

const ChartProvider: FC<ChartProviderProps> = ({ children, regions }) => {
  const chartState = useChartState(regions)

  return (
    <ChartContext.Provider value={chartState}>{children}</ChartContext.Provider>
  )
}

export const useChart = () => {
  const data = useContext(ChartContext)

  return data
}

export default ChartProvider
