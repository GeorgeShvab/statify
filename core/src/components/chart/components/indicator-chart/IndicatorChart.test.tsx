import { render, screen } from "@testing-library/react"
import { ChartProps } from "react-chartjs-2"
import IndicatorChart from "@/components/chart/components/indicator-chart/IndicatorChart"

const mockChartData = [
  {
    color: "#FF5733",
    id: "WEOWORLD",
    name: "World",
    values: [
      {
        id: 582764,
        value: 101325686724630,
        year: 2022,
      },
      {
        id: 582764,
        value: 101325686724629,
        year: 2021,
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
        id: 582827,
        value: 14266499429.8716,
        year: 2021,
      },
      {
        id: 582827,
        value: 14266499429.8746,
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

jest.mock("react-chartjs-2", () => ({
  __esModule: true,
  Line: (props: ChartProps<"line", (number | null)[]>) => <canvas {...props} />,
}))

describe("Test IndicatorChart component", () => {
  test("Should render IndicatorChart", () => {
    render(
      <IndicatorChart
        data={mockChartData}
        selectedRange={[2015, 2020]}
        range={[2021, 2022]}
        shortening={1}
      />
    )

    const chartEl = screen.getByTestId("indicator-line-chart")

    expect(chartEl).toBeInTheDocument()
  })
})
