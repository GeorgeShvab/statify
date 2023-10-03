'use client'

import { Country, Value } from '@/types'
import { useRouter } from 'next/navigation'
import { FC, ReactElement, createContext, useContext, useEffect, useState } from 'react'

interface ChartContext {
  data: (Country & { values: Value[] })[]
  remove: (id: string) => void
  add: (country: Country & { values: Value[] }) => void
  removeAll: () => void
  isError: boolean
  removeError: () => void
  range: number[]
  selectedRange: number[]
  setRange: (range: number[]) => void
  setSelectedRange: (range: number[]) => void
  setRanges: (range: number[], selectedRange: number[]) => void
}

const ChartContext = createContext<ChartContext>({
  data: [],
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
})

interface Props {
  initial: (Country & { values: Value[] })[]
  children: ReactElement
  initialRange: number[]
}

interface State {
  data: (Country & { values: Value[] })[]
  isError: boolean
  range: number[]
  selectedRange: number[]
}

export const ChartProvider: FC<Props> = ({ initial, children, initialRange }) => {
  const [data, setData] = useState<State>({
    data: initial,
    isError: false,
    selectedRange: initialRange,
    range: initialRange,
  })

  const router = useRouter()

  const remove = (id: string) => setData((prev) => ({ ...prev, data: prev.data.filter((item) => item.id !== id) }))

  const removeAll = () => setData((prev) => ({ ...prev, data: [] }))

  const removeError = () => setData((prev) => ({ ...prev, isError: false }))

  const setError = () => setData((prev) => ({ ...prev, isError: true }))

  const setRange = (range: number[]) => setData((prev) => ({ ...prev, range: range }))

  const setRanges = (range: number[], selectedRange: number[]) =>
    setData((prev) => ({ ...prev, range: range, selectedRange }))

  const setSelectedRange = (selectedRange: number[]) => setData((prev) => ({ ...prev, selectedRange }))

  const add = (country: Country & { values: Value[] }) => {
    setData((prev) => {
      if (prev.data.find((item) => item.id === country.id)) {
        return { ...prev, data: prev.data.filter((item) => item.id !== country.id) }
      } else if (prev.data.length > 4) {
        return { ...prev, isError: true }
      } else {
        return { ...prev, data: [...prev.data, country] }
      }
    })
  }

  useEffect(() => {
    let url = new URL(window.location.href)

    let params = new URLSearchParams(url.search)

    params.set(
      'chart_items',
      data.data
        .map((item) => item.id)
        .sort()
        .join(',')
    )

    router.replace('?' + params.toString(), { scroll: false })
  }, [data.data])

  return (
    <ChartContext.Provider
      value={{
        isError: data.isError,
        data: data.data,
        range: data.range,
        selectedRange: data.selectedRange,
        add,
        remove,
        removeAll,
        removeError,
        setRange,
        setSelectedRange,
        setRanges,
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

const useChart = () => {
  const data = useContext(ChartContext)

  return data
}

export default useChart
