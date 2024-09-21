import { render, screen } from "@testing-library/react"
import Input from "./Input"
import fireChange from "@/test-utils/fire-change"
import { InputProps } from "./Input.types"

const mockOnChange = jest.fn()
const initialValue = "Some text"

const renderWithProps = (props?: InputProps) => {
  return render(
    <Input value={initialValue} onChange={mockOnChange} {...props} />
  )
}

describe("Test Input component", () => {
  test("Should receive passed value", () => {
    renderWithProps()

    const inputEl = screen.getByRole("textbox")

    expect(inputEl).toHaveValue(initialValue)
  })

  test("Should call passed onChange callback when user fill in textbox", () => {
    renderWithProps()

    const inputEl = screen.getByRole("textbox")

    fireChange(inputEl, "New value")

    expect(mockOnChange).toHaveBeenCalled()
  })

  test("Should not apply error class by default", () => {
    renderWithProps()

    const inputEl = screen.getByRole("textbox")

    expect(inputEl).not.toHaveClass("error")
  })

  test("Should apply error class when passed isError equals true", () => {
    renderWithProps({ isError: true })

    const inputEl = screen.getByRole("textbox")

    expect(inputEl).toHaveClass("error")
  })
})
