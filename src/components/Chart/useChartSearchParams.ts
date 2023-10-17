import { ChartItem } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useChartSearchParams = (regions: ChartItem[]) => {
  const router = useRouter()

  useEffect(() => {
    if (regions.length) {
      let url = new URL(window.location.href)

      let params = new URLSearchParams(url.search)

      params.set(
        'chart_items',
        regions
          .filter((item) => item.isSelected)
          .map((item) => item.id)
          .sort()
          .join(',')
      )

      router.replace('?' + params.toString(), { scroll: false })
    }
  }, [regions])
}

export default useChartSearchParams
