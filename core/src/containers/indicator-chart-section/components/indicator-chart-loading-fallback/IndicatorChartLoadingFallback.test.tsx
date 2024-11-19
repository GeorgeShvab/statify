import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import IndicatorChartLoadingFallback from "./IndicatorChartLoadingFallback"

describe("Test IndicatorChartLoadingFallback", () => {
  test("Should render loading component", () => {
    render(<IndicatorChartLoadingFallback />)

    const loadingFallbackEl = screen.getByTestId("indicator-chart-loader")

    expect(loadingFallbackEl).toBeInTheDocument()
  })
})
