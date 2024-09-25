import throttle from "./throttle"

const mockCallback = jest.fn()

jest.useFakeTimers()

describe("Test throttle util", () => {
  test("Should call callback only two times, with the first and the last call", () => {
    const wrapperFn = throttle(mockCallback, 250)

    wrapperFn("a")
    wrapperFn("b")
    wrapperFn("c")
    wrapperFn("d")

    jest.advanceTimersByTime(500)

    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(mockCallback).toHaveBeenCalledWith("a")
    expect(mockCallback).toHaveBeenCalledWith("d")
  })
})
