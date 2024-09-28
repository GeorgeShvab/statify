import { act, renderHook, waitFor } from "@testing-library/react"
import { MutationConfiguration } from "@/hooks/use-mutation//types"
import useMutation from "@/hooks/use-mutation/useMutation"

const queryArgs = { data: "DATA" }

const successfullData = "Successfull data"
const error = new Error("Error Data")

const mockQueryFn = jest.fn().mockReturnValue(successfullData)
const mockOpenAlert = jest.fn()
const mockOnSuccess = jest.fn()
const mockOnError = jest.fn()

jest.useFakeTimers()

const errorQueryFn = () => {
  throw error
}

const loadingQueryFn = () => {
  return new Promise((resolve) => setTimeout(resolve, 500))
}

const successAlertConfig = { text: "That is success", severity: "success" }
const failAlertConfig = { text: "That is fail", severity: "danger" }

jest.mock("@/providers/alert-provider/AlertProvider", () => ({
  useAlert: () => ({ openAlert: mockOpenAlert }),
}))

const renderHookWithParams = (
  queryFn: (args: unknown) => Promise<unknown> = mockQueryFn,
  config?: MutationConfiguration
) => {
  return renderHook(() => useMutation(queryFn, config))
}

describe("Test useMutation hook", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Should call passed callback with right arguments when returned fn is called", async () => {
    const { result } = renderHook(() => useMutation(mockQueryFn))

    await act(() => result.current[1](queryArgs))

    expect(mockQueryFn).toHaveBeenCalledWith(queryArgs)
  })

  test("Should open alert when the request is successfull and propriate config is passed", async () => {
    const { result } = renderHookWithParams(mockQueryFn, {
      successMessage: successAlertConfig.text,
    })

    await act(() => result.current[1](queryArgs))

    expect(mockOpenAlert).toHaveBeenCalledWith(successAlertConfig)
  })

  test("Should open alert when the request is failed and propriate config is passed", async () => {
    const { result } = renderHookWithParams(errorQueryFn, {
      errorMessage: failAlertConfig.text,
    })

    await act(() => result.current[1](queryArgs))

    expect(mockOpenAlert).toHaveBeenCalledWith(failAlertConfig)
  })

  test("Should call passed onSuccess when the request is successfull", async () => {
    const { result } = renderHookWithParams(mockQueryFn, {
      onSuccess: mockOnSuccess,
    })

    await act(() => result.current[1](queryArgs))

    expect(mockOnSuccess).toHaveBeenCalled()
  })

  test("Should call passed onError when the request is failed", async () => {
    const { result } = renderHookWithParams(errorQueryFn, {
      onError: mockOnError,
    })

    await act(() => result.current[1](queryArgs))

    expect(mockOnError).toHaveBeenCalled()
  })

  test("Should return right data when the request is successfull", async () => {
    const { result } = renderHookWithParams()

    await act(() => result.current[1](queryArgs))

    expect(result.current[0].data).toBe(successfullData)
    expect(result.current[0].error).toBeNull()
    expect(result.current[0].isError).toBeFalsy()
    expect(result.current[0].isSuccess).toBeTruthy()
  })

  test("Should return right data when the request is failed", async () => {
    const { result } = renderHookWithParams(errorQueryFn)

    await act(() => result.current[1](queryArgs))

    expect(result.current[0].error).toBe(error)
    expect(result.current[0].isError).toBeTruthy()
    expect(result.current[0].isSuccess).toBeFalsy()
  })

  test("Should be is loading when the request is still loading", () => {
    const { result } = renderHookWithParams(loadingQueryFn)

    act(() => {
      result.current[1](queryArgs)
    })

    expect(result.current[0].isLoading).toBeTruthy()

    jest.advanceTimersByTime(750)

    waitFor(() => expect(result.current[0].isLoading).toBeFalsy())
  })
})
