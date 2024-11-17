import searchInString from "@/utils/search-in-string/searchInString"

const searchedString = "London is the capital of Great Britain"
const lowerCaseValue = "great britain"
const value = "Great Britain"
const wrongValue = "United States"

describe("Test searchInString util function", () => {
  test("Should return true for when searched string includes value", () => {
    const result = searchInString(searchedString, value)
    expect(result).toBeTruthy()
  })

  test("Should return true for when searched string includes value in lowercase", () => {
    const result = searchInString(searchedString, lowerCaseValue)
    expect(result).toBeTruthy()
  })

  test("Should return false for when searched string does not include value in any case", () => {
    const result = searchInString(searchedString, wrongValue)
    expect(result).toBeFalsy()
  })
})
