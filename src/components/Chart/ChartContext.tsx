'use client'

import { ChartItem, CountryRowValue } from '@/types'
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
  regions: CountryRowValue[]
}

const Container: FC<{ children: ReactElement }> = memo(({ children }) => {
  return children
})

export const ChartProvider: FC<Props> = ({ children, regions }) => {
  const { data, ...methods } = useChartState(regions)

  return (
    <ChartContext.Provider
      value={{
        ...data,
        ...methods
      }}
    >
      <Container>{children}</Container>
    </ChartContext.Provider>
  )
}

const useChart = () => {
  const data = useContext(ChartContext)

  return data
}

export default useChart
