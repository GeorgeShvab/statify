import { render, screen } from "@testing-library/react"
import ChartElement from "@/containers/indicator-chart-section/components/chart-element/ChartElement"
import { IndicatorChartProps } from "@/components/chart/components/indicator-chart/types"
import { EmptyChartStore, NotEMptyChartStore } from "@/store/chart-store/types"

const store = {
  selectedRange: [2000, 2001],
  shortening: 1,
  range: [2000, 2001],
  data: [
    {
      id: "WEOWORLD",
      name: "WORLD",
      maxValue: { id: 1, year: 2000, value: 20 },
      values: [
        {
          id: 1,
          year: 2000,
          value: 20,
        },
      ],
    },
  ],
} as unknown as NotEMptyChartStore

const emtpyStore = {
  ...store,
  data: [],
} as unknown as EmptyChartStore

const storeWithoutRange = {
  ...store,
  selectedRange: [2000, 2000],
} as unknown as NotEMptyChartStore

const mockIndicatorChart = jest.fn()

jest.mock(
  "@/components/chart/components/indicator-chart/IndicatorChart",
  () => ({
    __esModule: true,
    default: (props: IndicatorChartProps) => mockIndicatorChart(props),
  })
)

describe("Test ChartElement component", () => {
  test("Should render indicator chart with right props", () => {
    render(<ChartElement store={store} />)

    expect(mockIndicatorChart).toHaveBeenCalledWith({
      data: store.data,
      range: store.range,
      selectedRange: store.selectedRange,
      shortening: store.shortening,
    })
  })

  test("Should render no selected regions fallback when data is empty", () => {
    render(<ChartElement store={emtpyStore} />)

    const fallback = screen.getByText("Please, select at least one country")

    expect(fallback).toBeInTheDocument()
  })

  test("Should render no selected range fallback when end and start of the selected range are equal", () => {
    render(<ChartElement store={storeWithoutRange} />)

    const fallback = screen.getByText("Please, provide wider year range")

    expect(fallback).toBeInTheDocument()
  })
})
