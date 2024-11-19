import getChartData from "@/components/chart/components/indicator-chart/utils/get-chart-data/getChartData"
import { Range } from "@/components/chart/components/range-slider/types"

const mockChartData = [
  {
    color: "#FF5733",
    id: "WEOWORLD",
    name: "World",
    values: [
      {
        id: 582761,
        value: 101325686724631,
        year: 2019,
      },
      {
        id: 582762,
        value: 101325686724622,
        year: 2020,
      },
      {
        id: 582763,
        value: 101325686724623,
        year: 2021,
      },
      {
        id: 582764,
        value: 101325686724624,
        year: 2022,
      },
    ],
    maxValue: {
      id: 12,
      value: 101325686724630,
      year: 2022,
    },
  },
  {
    id: "AFG",
    name: "Afghanistan",
    values: [
      {
        id: 582826,
        value: 14266499429.8711,
        year: 2019,
      },
      {
        id: 582828,
        value: 14266499429.8742,
        year: 2020,
      },
      {
        id: 582829,
        value: 14266499429.8713,
        year: 2021,
      },
      {
        id: 582820,
        value: 14266499429.8744,
        year: 2022,
      },
    ],
    maxValue: {
      id: 582827,
      value: 14266499429.8746,
      year: 2022,
    },
    color: "#33A1FF",
  },
]

const expectedResult = {
  labels: [2020, 2021],
  datasets: [
    {
      data: [101325686724622, 101325686724623],
      borderColor: "#FF5733",
      fill: false,
      borderWidth: 1,
      pointHover: 0,
      pointRadius: 0,
      pointBackgroundColor: "#FF5733",
    },
    {
      data: [14266499429.8742, 14266499429.8713],
      borderColor: "#33A1FF",
      fill: false,
      borderWidth: 1,
      pointHover: 0,
      pointRadius: 0,
      pointBackgroundColor: "#33A1FF",
    },
  ],
}

const mockFUullRange = [2019, 2020, 2021, 2022]
const selectedRange: Range = [2020, 2021]

describe("Test getCHartData util", () => {
  test("Should return right chart data", () => {
    const result = getChartData(mockFUullRange, selectedRange, mockChartData)

    expect(result).toEqual(expectedResult)
  })
})
