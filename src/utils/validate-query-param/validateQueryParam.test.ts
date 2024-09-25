import validateQueryParam from "./validateQueryParam"

const possibleValues = ["a", "b"]

describe("Test validateQueryParam util", () => {
  test("Should return the first element of possible values when provided value is not string", () => {
    const result = validateQueryParam({}, possibleValues)

    expect(result).toBe(possibleValues[0])
  })

  test("Should return the first element of possible values when provided value is not inside of possible values", () => {
    const result = validateQueryParam("d", possibleValues)

    expect(result).toBe(possibleValues[0])
  })

  test("Should return passed value when it is inside of possible values array", () => {
    const result = validateQueryParam("b", possibleValues)

    expect(result).toBe("b")
  })
})
