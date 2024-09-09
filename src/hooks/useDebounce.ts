import debounce from '@/utils/debounce'
import { useCallback } from 'react'

const useDebounce = (func: (...args: any[]) => void, ms: number = 250) => {
  const fn = useCallback(debounce(func, 300), [ms])

  return fn
}

export default useDebounce
