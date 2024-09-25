import debounce from "./debounce"

const mockCallback = jest.fn()

jest.useFakeTimers()

describe("Test debounce util", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Should call function only one time if there are 3 calls in a row", () => {
    const wrapperFn = debounce(mockCallback, 250)

    wrapperFn("a")
    wrapperFn("b")
    wrapperFn("c")

    jest.advanceTimersByTime(500)

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith("c")
  })
})
