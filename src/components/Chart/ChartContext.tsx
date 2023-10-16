'use client'

import { ChartCountry, Country, Value } from '@/types'
import { useRouter } from 'next/navigation'
import React, { FC, ReactElement, createContext, memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import useColors from './useColors'

interface ChartContext {
  remove: (id: string) => void
  add: (country: string) => void
  removeAll: () => void
  isError: boolean
  removeError: () => void
  range: number[]
  selectedRange: number[]
  setRange: (range: number[]) => void
  setSelectedRange: (range: number[]) => void
  setRanges: (range: number[], selectedRange: number[]) => void
  regions: ChartCountry[]
}

const ChartContext = createContext<ChartContext>({
  remove: () => {},
  add: () => {},
  removeAll: () => {},
  removeError: () => {},
  isError: false,
  range: [],
  selectedRange: [],
  setRange: () => {},
  setSelectedRange: () => {},
  setRanges: () => {},
  regions: [],
})

interface Props {
  initial: string[]
  children: ReactElement
  initialRange: number[]
  regions: (Country & { values: Value[] })[]
}

interface State {
  isError: boolean
  range: number[]
  selectedRange: number[]
  regions: ChartCountry[]
}

const Container: FC<{ children: ReactElement }> = memo(({ children }) => {
  return children
})

export const ChartProvider: FC<Props> = ({ initial, children, initialRange, regions }) => {
  const { addColor, getColor } = useColors()

  const initialRegions = useMemo(
    () =>
      regions.map((item) => ({
        ...item,
        isSelected: initial.includes(item.id),
        color: initial.includes(item.id) ? getColor() : undefined,
      })),
    []
  )

  const [data, setData] = useState<State>({
    isError: false,
    selectedRange: initialRange,
    range: initialRange,
    regions: initialRegions,
  })

  const router = useRouter()

  const remove = (id: string) =>
    setData((prev) => ({
      ...prev,
      regions: prev.regions.map((item) => ({ ...item, isSelected: item.id === id ? false : item.isSelected })),
    }))

  const removeAll = () => setData((prev) => ({ ...prev, regions: initialRegions }))

  const removeError = () => setData((prev) => ({ ...prev, isError: false }))

  const setRange = (range: number[]) => setData((prev) => ({ ...prev, range: range }))

  const setRanges = (range: number[], selectedRange: number[]) =>
    setData((prev) => ({ ...prev, range: range, selectedRange }))

  const setSelectedRange = (selectedRange: number[]) => setData((prev) => ({ ...prev, selectedRange }))

  const add = (country: string) => {
    setData((prev) => {
      if (prev.regions.filter((item) => item.isSelected).length > 14) {
        if (prev.regions.find((item) => item.id === country)?.isSelected) {
          return {
            ...prev,
            regions: prev.regions.map((item) => {
              if (item.id === country && item.color) {
                addColor(item.color)
              }

              return {
                ...item,
                isSelected: item.id === country ? false : item.isSelected,
                color: item.id === country ? undefined : item.color,
              }
            }),
          }
        }

        return {
          ...prev,
          isError: true,
          regions: prev.regions.map((item) => {
            if (item.id === country && item.color) {
              addColor(item.color)
            }

            return {
              ...item,
              isSelected: item.id === country ? false : item.isSelected,
              color: item.id === country ? undefined : item.color,
            }
          }),
        }
      }

      return {
        ...prev,
        regions: prev.regions.map((item) => {
          let newColor = item.color

          if (item.id === country && item.color && item.isSelected) {
            addColor(item.color)
            newColor = undefined
          }

          if (item.id === country && !item.isSelected) {
            newColor = getColor()
          }

          return {
            ...item,
            isSelected: item.id === country ? !item.isSelected : item.isSelected,
            color: newColor,
          }
        }),
      }
    })
  }

  useEffect(() => {
    let url = new URL(window.location.href)

    let params = new URLSearchParams(url.search)

    params.set(
      'chart_items',
      data.regions
        .filter((item) => item.isSelected)
        .map((item) => item.id)
        .sort()
        .join(',')
    )

    router.replace('?' + params.toString(), { scroll: false })
  }, [data.regions])

  return (
    <ChartContext.Provider
      value={{
        isError: data.isError,
        range: data.range,
        selectedRange: data.selectedRange,
        regions: data.regions,
        add,
        remove,
        removeAll,
        removeError,
        setRange,
        setSelectedRange,
        setRanges,
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
