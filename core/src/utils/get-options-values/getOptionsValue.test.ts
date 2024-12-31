import { getOptionsValues } from "@/utils/get-options-values/getOptionsValues"

const testOptions = [
  {
    value: "updatedAt",
    label: "Date of update",
  },
  { value: "birthDate", label: "Date of birth" },
  { value: "surname", label: "Family name" },
]

const expectedResult = testOptions.map((item) => item.value)

describe("Test getOptionsValue util", () => {
  test("Should return option value", () => {
    const result = getOptionsValues(testOptions)

    expect(result).toEqual(expectedResult)
  })
})
