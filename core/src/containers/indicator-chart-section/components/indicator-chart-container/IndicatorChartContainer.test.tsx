import { render } from "@testing-library/react"
import { ChartProps } from "react-chartjs-2"
import { fireEvent, screen, waitFor } from "@testing-library/dom"
import IndicatorChartContainer from "@/containers/indicator-chart-section/components/indicator-chart-container/IndicatorChartContainer"
import { IndicatorChartContainerProps } from "@/containers/indicator-chart-section/components/indicator-chart-container/types"

const mockIndicator = {
  unit: "mlns",
  label: "GDP",
}

const mockAllData = [
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

const mockChartContext = {
  data: mockAllData,
  shortening: 1,
  add: () => {},
  remove: () => {},
  selectedRange: [2021, 2022],
  selectRange: () => {},
  range: [2021, 2022],
}

jest.mock("react-chartjs-2", () => ({
  __esModule: true,
  Line: (props: ChartProps<"line", (number | null)[]>) => <canvas {...props} />,
}))

jest.mock("@/providers/chart-provider/ChartProvider", () => ({
  useChartContext: () => mockChartContext,
}))

const renderWithProps = async (
  props?: Partial<IndicatorChartContainerProps>
) => {
  await waitFor(() => {
    render(
      <IndicatorChartContainer
        indicator={mockIndicator}
        data={mockAllData}
        {...props}
      />
    )
  })
}

const mockSaveToClipboard = jest.fn()

jest.mock("@/utils/save-to-clipboard-as-image/saveToClipboardAsImage", () => ({
  __esModule: true,
  default: () => mockSaveToClipboard(),
}))

describe("Test IndicatorChartContainer component", () => {
  test("Should render all the main elements", async () => {
    await renderWithProps()

    const chartHeader = screen.getByTestId("indicator-chart-header")
    const chart = screen.getByTestId("indicator-line-chart")
    const rangeSlider = screen.getByTestId("indicator-chart-range-slider")
    const copyButton = screen.getByTestId("indicator-chart-copy-button")
    const managerButton = screen.getByTestId("indicator-chart-manager-button")

    expect(chartHeader).toBeInTheDocument()
    expect(chart).toBeInTheDocument()
    expect(rangeSlider).toBeInTheDocument()
    expect(copyButton).toBeInTheDocument()
    expect(managerButton).toBeInTheDocument()
  })

  test("Should not show chart manager button if there is only one item in data", async () => {
    await renderWithProps({ data: mockAllData.slice(1) })

    const managerButton = screen.queryByTestId("indicator-chart-manager-button")
    expect(managerButton).not.toBeInTheDocument()
  })

  test("Should call save to clipboard function when appropriate button is clicked", async () => {
    await renderWithProps()

    const copyButton = screen.getByTestId("indicator-chart-copy-button")
    fireEvent.click(copyButton)

    expect(mockSaveToClipboard).toHaveBeenCalled()
  })
})
