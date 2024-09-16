import { render, screen } from "@testing-library/react"
import SelectItem from "./SelectItem"

describe("Test SelectItem", () => {
  test("Should render SelectItem", () => {
    render(<SelectItem isSelected={false}>Select Item</SelectItem>)

    const selectItem = screen.getByText("Select Item")
    expect(selectItem).toBeInTheDocument()
  })

  test("Should apply propriate style if passed isSelected is true", () => {
    render(<SelectItem isSelected>Select Item</SelectItem>)

    const selectItem = screen.getByText("Select Item")
    expect(selectItem).toHaveClass("selected")
  })
})
