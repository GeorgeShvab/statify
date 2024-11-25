import { renderHook } from "@testing-library/react"
import { DependencyList } from "react"
import useDebounce from "@/hooks/use-debounce/useDebounce"

/**
 * @group hooks
 */

const callback = jest.fn()

jest.useFakeTimers()

describe("Test useDebounce hook", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Should call passed callback only one time even despite a rerender", () => {
    const { result, rerender } = renderHook(() => useDebounce(callback))

    result.current()

    rerender()

    result.current()

    jest.advanceTimersByTime(500)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test("Should call passed callback two times because dependency array changed", () => {
    const { result, rerender } = renderHook(
      (deps: DependencyList = ["initial dependency"]) =>
        useDebounce(callback, 250, deps)
    )

    result.current()

    rerender(["new dependency"])

    result.current()

    jest.advanceTimersByTime(500)

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
