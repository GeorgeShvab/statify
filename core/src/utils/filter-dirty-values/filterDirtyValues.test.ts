import filterDirtyValues from "@/utils/filter-dirty-values/filterDirtyValues"

const testData = {
  name: "Walter",
  surname: "White",
  age: 21,
}

const dirtyValues = {
  name: true,
  surname: false,
  age: true,
}

const expectedResult = {
  name: "Walter",
  age: 21,
}

describe("Test filterDirtyValues util", () => {
  test("Should return only direty values", () => {
    const result = filterDirtyValues(testData, dirtyValues)

    expect(result).toEqual(expectedResult)
  })
})
