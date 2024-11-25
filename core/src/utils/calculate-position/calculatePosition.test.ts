import calculatePosition from "@/utils/calculate-position/calculatePosition"

/**
 * @group utils
 */

const initialAnchorPos = {
  top: 200,
  left: 200,
  right: 300,
  bottom: 300,
  width: 100,
  height: 100,
} as DOMRect

const initialDocumentPos = {
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 500,
  scrollWidth: 500,
} as HTMLElement

const initialContainerPos = {
  width: 20,
  height: 20,
} as DOMRect

const mockTestData = [
  {
    position: "top",
    expected: { top: 180, left: 240 },
  },
  {
    position: "top-start",
    expected: { top: 180, left: 200 },
  },
  {
    position: "top-end",
    expected: { top: 180, left: 280 },
  },
  {
    position: "bottom",
    expected: { top: 300, left: 240 },
  },
  {
    position: "bottom-start",
    expected: { top: 300, left: 200 },
  },
  {
    position: "bottom-end",
    expected: { top: 300, left: 280 },
  },
  {
    position: "left",
    expected: { top: 240, left: 180 },
  },
  {
    position: "left-start",
    expected: { top: 200, left: 180 },
  },
  {
    position: "left-end",
    expected: { top: 280, left: 180 },
  },
  {
    position: "right",
    expected: { top: 240, left: 300 },
  },
  {
    position: "right-start",
    expected: { top: 200, left: 300 },
  },
  {
    position: "right-end",
    expected: { top: 280, left: 300 },
  },
] as const

const mockTestDataWithOverflow = [
  {
    position: "top",
    expected: { top: 60, left: 240 },
    anchorPos: {
      ...initialAnchorPos,
      top: 40,
      bottom: 60,
    },
  },
  {
    position: "bottom",
    expected: { top: 440, left: 240 },
    anchorPos: {
      ...initialAnchorPos,
      top: 460,
      bottom: 480,
    },
  },
  {
    position: "left",
    expected: { top: 240, left: 60 },
    anchorPos: {
      ...initialAnchorPos,
      left: 40,
      right: 60,
    },
  },
  {
    position: "right",
    expected: { top: 240, left: 440 },
    anchorPos: {
      ...initialAnchorPos,
      left: 460,
      right: 480,
    },
  },
] as const

describe("Test calculate position", () => {
  test.each(mockTestData)(
    "Should return right absolute position for $position position",
    ({ position, expected }) => {
      jest
        .spyOn(document, "documentElement", "get")
        .mockReturnValue(initialDocumentPos)

      const res = calculatePosition(
        initialAnchorPos,
        initialContainerPos,
        position
      )

      expect(res).toEqual(expected)
    }
  )

  test.each(mockTestDataWithOverflow)(
    "Should return oposite absolute position for $position, because there is not enough space on the $position",
    ({ position, expected, anchorPos }) => {
      jest
        .spyOn(document, "documentElement", "get")
        .mockReturnValue(initialDocumentPos)

      const res = calculatePosition(anchorPos, initialContainerPos, position)

      expect(res).toEqual(expected)
    }
  )

  test("Should return correct position with offset = 5", () => {
    jest
      .spyOn(document, "documentElement", "get")
      .mockReturnValue(initialDocumentPos)

    const expected = { left: 240, top: 175 }

    const res = calculatePosition(
      initialAnchorPos,
      initialContainerPos,
      "top",
      5
    )

    expect(res).toEqual(expected)
  })
})
