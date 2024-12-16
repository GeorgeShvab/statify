import parseSearchParams from "@/utils/parse-search-params/parseSearchParams"

/**
 * @group utils
 */

const testValueWithSentence = {
  capital: "Washington, D.C.",
  country: "USA",
  anthem:
    "The Star-Spangled Banner, written by Francis Scott Key, is the national anthem of the USA.",
}

const testValueWithArray = {
  countries: "USA,Canada,Mexico",
}

const valueWithArrayResult = {
  countries: ["USA", "Canada", "Mexico"],
}

describe("Test ParseSearchParams", () => {
  test("Should return the same object if query string is a simple sentence", () => {
    const result = parseSearchParams(testValueWithSentence)

    expect(result).toEqual(testValueWithSentence)
  })

  test("Should return parsed result if there is array in query params", () => {
    const result = parseSearchParams(testValueWithArray)

    expect(result).toEqual(valueWithArrayResult)
  })
})
