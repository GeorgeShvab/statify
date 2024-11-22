import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus"

describe("Test isErrorWithStatus util", () => {
  test("Should return false if passed value is not an object", () => {
    const result = isErrorWithStatus("error")

    expect(result).toBe(false)
  })

  test("Should return false if passed value is null", () => {
    const result = isErrorWithStatus(null)

    expect(result).toBe(false)
  })

  test("Should return false if there is no response property", () => {
    const result = isErrorWithStatus({ data: null })

    expect(result).toBe(false)
  })

  test("should return false if response property is not an object", () => {
    const result = isErrorWithStatus({ response: "error" })

    expect(result).toBe(false)
  })

  test("should return false if response property is null", () => {
    const result = isErrorWithStatus({ response: null })

    expect(result).toBe(false)
  })

  test("should return false if there is no status property inside of response property", () => {
    const result = isErrorWithStatus({ response: { data: null } })

    expect(result).toBe(false)
  })

  test("should return false if status is not a number", () => {
    const result = isErrorWithStatus({ response: { status: "400" } })

    expect(result).toBe(false)
  })

  test("should return true if passed arg is object with response and status", () => {
    const result = isErrorWithStatus({
      response: { status: 500 },
      data: "some data",
    })

    expect(result).toBe(true)
  })
})
