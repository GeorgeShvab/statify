'use client'

import { ChartItem } from '@/types'
import React, { FC, ReactElement, createContext, memo, useContext } from 'react'
import useChartState from './useChartState'
import useChartSearchParams from './useChartSearchParams'

interface ChartContext {
  remove: (id: string) => void
  add: (country: string) => void
  removeAll: () => void
  isError: boolean
  removeError: () => void
  range: number[]
  selectedRange: number[]
  setSelectedRange: (range: number[]) => void
  regions: ChartItem[]
  isLoading: boolean
}

const ChartContext = createContext<ChartContext>({
  remove: () => {},
  add: () => {},
  removeAll: () => {},
  removeError: () => {},
  isError: false,
  range: [],
  selectedRange: [],
  setSelectedRange: () => {},
  regions: [],
  isLoading: true,
})

interface Props {
  initial: string[]
  children: ReactElement
  indicator: string
  country?: string
}

const Container: FC<{ children: ReactElement }> = memo(({ children }) => {
  return children
})

export const ChartProvider: FC<Props> = ({ initial, children, indicator, country }) => {
  const { data, ...methods } = useChartState(initial, indicator, country)

  useChartSearchParams(data.regions)

  return (
    <ChartContext.Provider
      value={{
        ...data,
        ...methods,
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
