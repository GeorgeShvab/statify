import { ChartItem } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetChartData = (indicator: string, country?: string) => {
  const [data, setData] = useState<ChartItem[]>()

  useEffect(() => {
    ;(async () => {
      let data: ChartItem[]

      if (country) {
        data = [(await axios.get<ChartItem>(`/api/indicator/${indicator}/${country}`)).data]
      } else {
        data = (await axios.get<ChartItem[]>('/api/indicator/' + indicator)).data
      }

      setData(data)
    })()
  }, [])

  return data
}

export default useGetChartData
