import capitalize from "@/utils/capitalize/capitalize"

const testValue = "test"
const expectedResult = "Test"

describe("Test capitalize util function", () => {
  test("Should capitalize the first letter", () => {
    const result = capitalize(testValue)

    expect(result).toBe(expectedResult)
  })
})
