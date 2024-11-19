import { render, screen } from "@testing-library/react"
import ChartFallback from "@/components/chart/components/chart-fallback/ChartFallback"

const testFallbackMsg = "Fallback message"

describe("Test ChartFallback component", () => {
  test("Should render title and description", () => {
    render(<ChartFallback>{testFallbackMsg}</ChartFallback>)

    const messageEl = screen.getByText(testFallbackMsg)

    expect(messageEl).toBeInTheDocument()
  })
})
