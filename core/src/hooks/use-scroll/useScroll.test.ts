import { act, renderHook, waitFor } from "@testing-library/react"
import { UIEvent } from "react"
import useScroll from "@/hooks/use-scroll/useScroll"

describe("Test useScroll hook", () => {
  let result: ReturnType<typeof useScroll>

  beforeEach(() => {
    result = renderHook(() => useScroll()).result.current
  })

  const callHandler = (
    scrollTop: number,
    offsetHeight: number,
    scrollHeight: number
  ) => {
    const mockEvent = {
      target: {
        scrollTop,
        offsetHeight,
        scrollHeight,
      },
    }

    return act(() => result[1](mockEvent as unknown as UIEvent<HTMLElement>))
  }

  test("Should be at start by default", () => {
    expect(result[0].isAtStart).toBeTruthy()
    expect(result[0].isAtEnd).toBeFalsy()
  })

  test("Should return isAtStart true when there is less than 50 px to the top", () => {
    callHandler(25, 50, 400)

    waitFor(() => {
      expect(result[0].isAtStart).toBeTruthy()
      expect(result[0].isAtEnd).toBeFalsy()
    })
  })

  test("Should return isAtEnd true when there is less than 50 px to the bottom", () => {
    callHandler(325, 50, 400)

    waitFor(() => {
      expect(result[0].isAtStart).toBeFalsy()
      expect(result[0].isAtEnd).toBeTruthy()
    })
  })

  test("Should be not at start nor at end when scrolled to middle", () => {
    callHandler(100, 50, 400)

    waitFor(() => {
      expect(result[0].isAtStart).toBeFalsy()
      expect(result[0].isAtEnd).toBeFalsy()
    })
  })
})
