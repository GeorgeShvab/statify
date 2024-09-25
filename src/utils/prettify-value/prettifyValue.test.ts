import prettifyValue from "./prettifyValue"

const testValue = 1_000_000.0008

describe("Test prettifyValue util", () => {
  test("Should return splited by 3 characters passed value without any precision", () => {
    const result = prettifyValue(testValue)

    expect(result).toBe("1 000 000")
  })

  test("Should return splited by 3 characters passed value with passed precision", () => {
    const result = prettifyValue(testValue, 3)

    expect(result).toBe("1 000 000.001")
  })
})
