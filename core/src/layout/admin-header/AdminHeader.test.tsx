import { render, screen } from "@testing-library/react"
import AdminHeader from "@/layout/admin-header/AdminHeader"

/**
 * @group layout
 */

const mockUsePathname = jest.fn().mockReturnValue("")

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

describe("Test AdminHeader component", () => {
  test("Should display logo as a link", () => {
    render(<AdminHeader />)

    const logo = screen.getByText("Statify")
    expect(logo).toBeInTheDocument()
  })

  test("Should display 4 links and 3 li elements", () => {
    render(<AdminHeader />)

    const linkEls = screen.getAllByRole("link")
    const liEls = screen.getAllByRole("listitem")

    expect(linkEls).toHaveLength(4)
    expect(liEls).toHaveLength(3)
  })

  test.each([
    ["indicators", 1],
    ["countries", 2],
    ["values", 3],
  ])("Should activate %s link", (page, linkIndex) => {
    mockUsePathname.mockReturnValue(page)
    render(<AdminHeader />)

    const activeLink = screen.getAllByRole("link")[linkIndex]
    expect(activeLink).toHaveClass("contained")
  })
})
