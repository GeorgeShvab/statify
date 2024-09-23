import { render, screen } from "@testing-library/react"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import { DropdownItemProps } from "./DropdownItem.types"

const renderWithProps = (props?: Partial<DropdownItemProps>) => {
  return render(<DropdownItem {...props}>Dropdown Item</DropdownItem>)
}

describe("Test DropdownItem", () => {
  test("Should render dropdown item with passed children", () => {
    renderWithProps()

    const dropdownItem = screen.getByText("Dropdown Item")
    expect(dropdownItem).toBeInTheDocument()
  })

  test("Should render drodpown item start icon", () => {
    renderWithProps({
      startIcon: <span data-testid="Dropdown start icon" />,
    })

    const icon = screen.getByTestId("Dropdown start icon")
    expect(icon).toBeInTheDocument()
  })

  test("Should render drodpown item end icon", () => {
    renderWithProps({
      endIcon: <span data-testid="Dropdown end icon" />,
    })

    const icon = screen.getByTestId("Dropdown end icon")
    expect(icon).toBeInTheDocument()
  })
})
