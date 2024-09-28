import { renderHook, act, waitFor } from "@testing-library/react"
import useOptimisticUpdate from "@/hooks/use-optimistic-update/useOptimisticUpdate"

const queryFn = async () => ({})

const errorQueryFn = async () => {
  throw new Error()
}

const errorWithDelayQueryFn = () => {
  return new Promise((resolve) => setTimeout(resolve, 500))
}

const mockOnError = jest.fn()

const initialValue = "Initial Value"
const newValue = "New Value"

describe("Test useOptimisticUpdate hook", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Should return initial value", () => {
    const { result } = renderHook(() =>
      useOptimisticUpdate(queryFn, { initialValue })
    )

    expect(result.current[0].value).toBe(initialValue)
  })

  test("Should return new value passed while calling returned fn", async () => {
    const { result } = renderHook(() =>
      useOptimisticUpdate(queryFn, { initialValue })
    )

    await act(() => result.current[1]({}, newValue))

    expect(result.current[0].value).toBe(newValue)
  })

  test("Should return firstly new value and then old value when the request failed", () => {
    const { result } = renderHook(() =>
      useOptimisticUpdate(errorWithDelayQueryFn, { initialValue })
    )

    act(() => {
      result.current[1]({}, newValue)
    })

    expect(result.current[0].value).toBe(newValue)

    waitFor(() => {
      expect(result.current[0].value).toBe(initialValue)
    })
  })

  test("Should call passed onError", async () => {
    const { result } = renderHook(() =>
      useOptimisticUpdate(errorQueryFn, { initialValue, onError: mockOnError })
    )

    await act(() => result.current[1]({}, newValue))

    expect(mockOnError).toHaveBeenCalled()
  })
})
