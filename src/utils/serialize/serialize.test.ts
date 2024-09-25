import serialize from "./serialize"

const testObject = { text: "Some text", func: () => {} }

describe("Test serialize util", () => {
  test("Should return serialized passed value", () => {
    const result = serialize(testObject)

    expect(result).toEqual({ text: testObject.text })
  })
})