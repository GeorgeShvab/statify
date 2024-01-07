'use client'

import { ChartItem } from '@/types'
import React, { FC, ReactElement, createContext, memo, useContext } from 'react'
import useChartState from './useChartState'

interface ChartContext {
  remove: (id: string) => void
  add: (country: string) => void
  removeAll: () => void
  isError: boolean
  removeError: () => void
  regions: ChartItem[]
  shortening: number | null
}

const ChartContext = createContext<ChartContext>({
  remove: () => {},
  add: () => {},
  removeAll: () => {},
  removeError: () => {},
  isError: false,
  regions: [],
  shortening: null,
})

interface Props {
  children: ReactElement
  regions: ChartItem[]
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
