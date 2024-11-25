import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import Header from "@/layout/header/Header"

/**
 * @group layout
 */

describe("Test Header component", () => {
  test("Should display logo as a link", () => {
    render(<Header />)

    const logo = screen.getByText("Statify")
    const linkElement = screen.getByRole("link")

    expect(logo).toBeInTheDocument()
    expect(linkElement).toBeInTheDocument()
  })
})
