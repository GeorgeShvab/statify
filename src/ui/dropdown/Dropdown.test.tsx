import Dropdown from "./Dropdown"
import { DropdownProps } from "./Dropdown.types"
import DropdownItem from "./components/dropdown-item/DropdownItem"
import { fireEvent, render, screen } from "@testing-library/react"

const mockOnClose = jest.fn()

const dropdownItems = new Array(10)
  .fill(null)
  .map((_, index) => <DropdownItem key={index}>Item {index + 1}</DropdownItem>)

const props: DropdownProps = {
  isOpen: false,
  anchor: { current: document.createElement("div") },
  position: "bottom-start",
  children: dropdownItems,
  onClose: mockOnClose,
}

describe("Test Dropdown component", () => {
  test("Should not render anything when passed isOpen is false", () => {
    render(<Dropdown {...props} />)

    const dropdown = screen.queryByRole("list")
    expect(dropdown).not.toBeInTheDocument()
  })

  test("Should render list and items when passed isOpen is true", async () => {
    render(<Dropdown {...props} isOpen={true} />)

    const dropdown = await screen.findByRole("list")
    const dropdownItems = await screen.findAllByText(/Item/)

    expect(dropdown).toBeInTheDocument()
    expect(dropdownItems).toHaveLength(10)
  })

  test("Should open closed Dropdown", async () => {
    const { rerender } = render(<Dropdown {...props} isOpen={false} />)

    const closedDropdown = screen.queryByRole("list")
    expect(closedDropdown).not.toBeInTheDocument()

    rerender(<Dropdown {...props} isOpen={true} />)

    const openedDropdown = await screen.findByRole("list")
    expect(openedDropdown).toBeInTheDocument()
  })

  test("Should close Dropdown when user clicks outside", async () => {
    const { container } = render(<Dropdown {...props} isOpen={true} />)

    fireEvent.click(container)

    expect(mockOnClose).toHaveBeenCalled()
  })
})
