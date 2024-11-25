import { render, screen } from "@testing-library/react"
import ChartTitle from "@/components/chart/components/chart-title/ChartTitle"

/**
 * @group chart
 */

const testData = {
  title: "Chart title",
  subtitle: "Chart subtitle",
}

describe("Test ChartTitle component", () => {
  test("Should render title and subtitle", () => {
    render(<ChartTitle {...testData} />)

    const title = screen.getByText(testData.title)
    const subtitle = screen.getByText(testData.subtitle)

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })
})
