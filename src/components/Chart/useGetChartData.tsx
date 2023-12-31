'use client'

import { ChartItem } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetChartData = (indicator: string, country?: string) => {
  const [data, setData] = useState<ChartItem[]>()

  useEffect(() => {
    const abortController = new AbortController()

    ;(async () => {
      let data: ChartItem[]

      if (country) {
        data = [
          (await axios.get<ChartItem>(`/api/indicator/${indicator}/${country}`, { signal: abortController.signal }))
            .data,
        ]
      } else {
        data = (await axios.get<ChartItem[]>('/api/indicator/' + indicator, { signal: abortController.signal })).data
      }

      setData(data)
    })()

    return () => abortController.abort()
  }, [])

  return data
}

export default useGetChartData
