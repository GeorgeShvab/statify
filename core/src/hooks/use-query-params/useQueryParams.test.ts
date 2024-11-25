import { act, renderHook } from "@testing-library/react"
import useQueryParams from "@/hooks/use-query-params/useQueryParams"

/**
 * @group hooks
 */

const mockPush = jest.fn()

const initialQuery = "?sort=id"
const pathname = "/admin/dashboard"

const testQueryKey = "sortDirection"
const testQueryValue = "asc"

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(initialQuery),
  usePathname: () => pathname,
}))

describe("Test useQueryParams hook", () => {
  test("Should return right search params object", () => {
    const { result } = renderHook(() => useQueryParams())

    expect(result.current[0]).toEqual({ sort: "id" })
  })

  test("Should set new passed params", async () => {
    const { result } = renderHook(() => useQueryParams())

    await act(() => result.current[1](testQueryKey, testQueryValue))

    expect(mockPush).toHaveBeenCalledWith(
      `${pathname}${initialQuery}&${testQueryKey}=${testQueryValue}`
    )
  })

  test("Should clear passed params when the value is empty", async () => {
    const { result } = renderHook(() => useQueryParams())

    await act(() => result.current[1]("sort", ""))

    expect(mockPush).toHaveBeenCalledWith(`${pathname}?`)
  })

  test("Should clear all of the params when clear is called", async () => {
    const { result } = renderHook(() => useQueryParams())

    await act(() => result.current[2]())

    expect(mockPush).toHaveBeenCalledWith(`${pathname}?`)
  })
})
