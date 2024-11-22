import validateNumber from "@/utils/validate-positive-number/validatePositiveNumber"

describe("Test validateNumber util", () => {
  test("Should return null for string", () => {
    const res = validateNumber("notanumber")

    expect(res).toBeNull()
  })

  test("Should return null for object", () => {
    const res = validateNumber({})

    expect(res).toBeNull()
  })

  test("Should return number for string number", () => {
    const res = validateNumber("2")

    expect(res).toBe(2)
  })

  test("Should return number for number", () => {
    const res = validateNumber(5)

    expect(res).toBe(5)
  })

  test("Should return null for negative string number", () => {
    const res = validateNumber("-5")

    expect(res).toBeNull()
  })

  test("Should return null for negative number", () => {
    const res = validateNumber(-5)

    expect(res).toBeNull()
  })

  test("Should return null for null", () => {
    const res = validateNumber(null)

    expect(res).toBeNull()
  })
})
