import { renderHook } from "@testing-library/react"
import useOnScroll from "@/hooks/use-on-scroll/useOnScroll"

const mockHandleScroll = jest.fn()

describe("Test useOnScroll hook", () => {
  test("Should call passed callback when user scrolls", () => {
    renderHook(() => useOnScroll(mockHandleScroll, []))

    document.dispatchEvent(new Event("wheel"))

    expect(mockHandleScroll).toHaveBeenCalled()
  })
})
