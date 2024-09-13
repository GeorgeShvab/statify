import debounce from "@/utils/debounce/debounce"
import { DependencyList, useCallback } from "react"

const useDebounce = (
  func: (...args: any[]) => void,
  ms: number = 250,
  dependencies: DependencyList = []
) => {
  const fn = useCallback(debounce(func, 300), [ms, ...dependencies])

  return fn
}

export default useDebounce
