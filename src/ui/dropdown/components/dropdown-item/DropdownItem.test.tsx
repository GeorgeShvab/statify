import { render, screen } from "@testing-library/react"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"

describe("Test DropdownItem", () => {
  beforeEach(() => {
    render(
      <DropdownItem
        startIcon={<span data-testid="Dropdown start icon" />}
        endIcon={<span data-testid="Dropdown end icon" />}
      >
        Dropdown Item
      </DropdownItem>
    )
  })

  test("Should render dropdown items", () => {
    const dropdownItem = screen.getByText("Dropdown Item")
    expect(dropdownItem).toBeInTheDocument()
  })

  test("Should render drodpown item start icon", () => {
    const icon = screen.getByTestId("Dropdown start icon")
    expect(icon).toBeInTheDocument()
  })

  test("Should render drodpown item end icon", () => {
    const icon = screen.getByTestId("Dropdown end icon")
    expect(icon).toBeInTheDocument()
  })
})
