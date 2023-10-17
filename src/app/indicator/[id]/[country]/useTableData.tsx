import { Value } from '@/types'
import quickSort from '@/utils/quickSort'
import { useState } from 'react'

interface State {
  data: Value[]
  order: 'asc' | 'desc'
  by?: 'year' | 'value'
}

const useTableData = (data: Value[]) => {
  const [state, setState] = useState<State>({
    data: data,
    order: 'asc',
    by: 'year',
  })

  const handleSort = (by: 'year' | 'value') => {
    if (by === 'year') {
      setState((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'year' ? 'desc' : 'asc',
        by: 'year',
        data: quickSort(
          prev.data,
          (prev.order === 'asc' && prev.by === 'year' ? 'desc' : 'asc') as any,
          (item) => item.year
        ),
      }))
    } else {
      setState((prev) => ({
        ...prev,
        order: prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc',
        by: 'value',
        data: quickSort(
          prev.data,
          (prev.order === 'asc' && prev.by === 'value' ? 'desc' : 'asc') as any,
          (item) => item.value
        ),
      }))
    }
  }

  return [state, handleSort] as const
}

export default useTableData
