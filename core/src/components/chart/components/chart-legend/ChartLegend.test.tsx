import { render, screen } from "@testing-library/react"
import ChartLegend from "@/components/chart/components/chart-legend/ChartLegend"

const mockChartItems = [
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
    ],
    maxValue: {
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
        value: 14266499429.8746,
        year: 2021,
      },
    ],
    maxValue: {
      value: 20497128600.3363,
      year: 2014,
    },
    color: "#33A1FF",
  },
]

describe("Test ChartLegend component", () => {
  beforeEach(() => {
    render(<ChartLegend items={mockChartItems} />)
  })

  test("Should render two county names", () => {
    const legendCountryNames = screen.getAllByTestId("chart-legend-name-label")

    expect(legendCountryNames).toHaveLength(2)
  })

  test("Should render two color labels", () => {
    const legendColorLabels = screen.getAllByTestId("chart-legend-color-label")

    expect(legendColorLabels).toHaveLength(2)
  })
})
