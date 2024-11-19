import filterValues from "@/components/chart/components/indicator-chart/utils/filter-values/filterValues"

const mockChartItem = {
  id: "AFG",
  name: "Afghanistan",
  values: [
    {
      id: 582827,
      value: 14266499421,
      year: 2018,
    },
    {
      id: 582828,
      value: 14266499422,
      year: 2021,
    },
    {
      id: 582829,
      value: 14266499424,
      year: 2022,
    },
  ],
  maxValue: {
    id: 582829,
    value: 14266499424,
    year: 2022,
  },
  color: "#33A1FF",
}

const mockRange = [2017, 2018, 2019, 2020, 2021, 2022]
const expectedResult = [null, 14266499421, null, null, 14266499422, 14266499424]

const mockRangeWithGaps = [2019, 2020, 2021, 2022]
const expectedResultWithGaps = [null, null, 14266499422, 14266499424]

describe("Test filterValues util", () => {
  test("Should return right result", () => {
    const result = filterValues(mockChartItem, mockRange)

    expect(result).toEqual(expectedResult)
  })

  test("Should return right result with offset", () => {
    const result = filterValues(mockChartItem, mockRangeWithGaps)

    expect(result).toEqual(expectedResultWithGaps)
  })
})
