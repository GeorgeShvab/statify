import generateRandomColor from "@/utils/generate-random-color/generateRandomColor"

describe("Test generateRandomColor util", () => {
  test("Should return random color hex", () => {
    const result = generateRandomColor()

    expect(result).toMatch(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
  })
})
