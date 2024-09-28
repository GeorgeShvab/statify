import { DependencyList, useCallback } from "react"
import debounce from "@/utils/debounce/debounce"

const useDebounce = <T>(
  func: (...args: T[]) => void,
  ms: number = 250,
  dependencies: DependencyList = []
) => {
  const fn = useCallback(debounce(func, ms), [ms, ...dependencies])

  return fn
}

export default useDebounce
