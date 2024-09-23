import { fireEvent, render, screen } from "@testing-library/react"
import Dropdown from "@/ui/dropdown/Dropdown"
import { DropdownProps } from "@/ui/dropdown/Dropdown.types"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"

const mockOnClose = jest.fn()
const mockOnClick = jest.fn()

const dropdownItems = new Array(10)
  .fill(null)
  .map((_, index) => <DropdownItem key={index}>Item {index + 1}</DropdownItem>)

const props: DropdownProps = {
  isOpen: false,
  anchor: { current: document.createElement("div") },
  position: "bottom-start",
  children: dropdownItems,
  onClose: mockOnClose,
  onClick: mockOnClick,
}

describe("Test Dropdown component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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

  test("Should close dropdown when passed closeOnClick equals true and user clicks on one of the items", () => {
    render(<Dropdown {...props} isOpen={true} closeOneClick={true} />)

    const dropdownItem = screen.getAllByRole("listitem")[0]

    fireEvent.click(dropdownItem)

    expect(mockOnClose).toHaveBeenCalled()
  })

  test("Should not close dropdown and just call passed onClick if closeOnClick equals false", () => {
    render(<Dropdown {...props} isOpen={true} />)

    const dropdownItem = screen.getAllByRole("listitem")[0]

    fireEvent.click(dropdownItem)

    expect(mockOnClick).toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  test("Should close Dropdown when user clicks outside", async () => {
    const { container } = render(<Dropdown {...props} isOpen={true} />)

    fireEvent.click(container)

    expect(mockOnClose).toHaveBeenCalled()
  })
})
