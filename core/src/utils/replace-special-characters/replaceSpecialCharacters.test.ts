import replaceSpecialCharacters from "@/utils/replace-special-characters/replaceSpecialCharacters"

const testString = `GDP' ; DROP TABLE "Indicators"`
const expectedResult = `GDP    DROP TABLE  Indicators `

describe("Test replaceSpecialCharacters util", () => {
  test("Should replace special characters with space", () => {
    const result = replaceSpecialCharacters(testString)

    expect(result).toBe(expectedResult)
  })
})
