'use client'

import { ChartItem } from '@/types'
import React, { FC, ReactElement, createContext, memo, useContext } from 'react'
import useChartState from '@/components/Chart/useChartState'

interface ChartContext {
  isLimitError: boolean
  removeError: () => void
  regions: ChartItem[]
  shortening: number
  update: (data: Partial<ChartItem> & { id: string }) => void
}

const ChartContext = createContext<ChartContext>({
  removeError: () => {},
  update: () => {},
  isLimitError: false,
  regions: [],
  shortening: 10000
})

interface Props {
  children: ReactElement
  regions: ChartItem[]
}

export const ChartProvider: FC<Props> = ({ children, regions }) => {
  const { data, ...methods } = useChartState(regions)

  return (
    <ChartContext.Provider
      value={{
        ...data,
        ...methods
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

ChartProvider.displayName = 'ChartProvider'

const useChart = () => {
  const data = useContext(ChartContext)

  return data
}

export default useChart
