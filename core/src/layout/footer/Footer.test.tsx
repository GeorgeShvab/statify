import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import Footer from "@/layout/footer/Footer"

/**
 * @group layout
 */

describe("Test Footer component", () => {
  beforeEach(() => {
    render(<Footer />)
  })

  test("Should display 4 links for navigation", () => {
    const linkElements = screen.getAllByRole("link")
    expect(linkElements).toHaveLength(4)
  })

  test("Should display copyright text", () => {
    const copyrightEl = screen.getByText(
      "© 2023-2024 Heorhii Shvab. All rights reserved."
    )

    expect(copyrightEl).toBeInTheDocument()
  })
})
