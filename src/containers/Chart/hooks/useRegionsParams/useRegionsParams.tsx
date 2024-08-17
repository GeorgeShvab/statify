import { ChartItem } from '@/types'
import { useEffect } from 'react'

const useRegionsParams = (data: ChartItem[]) => {
  useEffect(() => {
    if (data.length) {
      let url = new URL(window.location.href)

      let params = new URLSearchParams(url.search)

      const chartItems = data
        .filter((item) => item.isSelected)
        .map((item) => item.id)
        .sort()
        .join(',')

      params.set('chart_items', chartItems)

      const newUrl = '?' + params.toString()

      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        '',
        newUrl
      ) // I use this to prevent ssr request on params changing, cause I use params only for users to be able to share links with already added in chart regions
    }
  }, [data])
}

export default useRegionsParams
