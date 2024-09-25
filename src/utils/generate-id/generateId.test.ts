import generateId from "./generateId"

describe("Test generateId util", () => {
  test("Should return string id", () => {
    const result = generateId()

    expect(typeof result).toBe("string")
  })

  test("Should return different ids", () => {
    const id1 = generateId()
    const id2 = generateId()

    expect(id1).not.toBe(id2)
  })
})
