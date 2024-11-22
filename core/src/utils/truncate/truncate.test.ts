import truncate from "@/utils/truncate/truncate"

const testString =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry."

describe("Test truncate util", () => {
  test("Should truncate string", () => {
    const result = truncate(testString, 10)

    expect(result.split(" ")).toHaveLength(10)
  })
})
