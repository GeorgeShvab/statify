import quickSort from "@/utils/quick-sort/quickSort"

const testNumberData = [1, 5, 2, 9, 4, 2, 34, 2, 4, 54]
const testObjectData = [{ id: 44 }, { id: 2 }, { id: 5 }, { id: 33 }]

describe("Test quickSort util", () => {
  test("Should sort array consisting of numbers in asc order", () => {
    const result = quickSort([...testNumberData])

    const expected = [...testNumberData].toSorted((a, b) => a - b)

    expect(result).toEqual(expected)
  })

  test("Should sort array consisting of numbers in desc order", () => {
    const result = quickSort([...testNumberData], "desc")

    const expected = [...testNumberData].toSorted((a, b) => b - a)

    expect(result).toEqual(expected)
  })

  test("Should sort array consisting of objects in asc order", () => {
    const result = quickSort([...testObjectData], "asc", ({ id }) => id)

    const expected = [...testObjectData].toSorted((a, b) => a.id - b.id)

    expect(result).toEqual(expected)
  })

  test("Should sort array consisting of objects in desc order", () => {
    const result = quickSort([...testObjectData], "desc", ({ id }) => id)

    const expected = [...testObjectData].toSorted((a, b) => b.id - a.id)

    expect(result).toEqual(expected)
  })
})
