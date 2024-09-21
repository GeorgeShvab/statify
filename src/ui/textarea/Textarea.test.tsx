import { render, screen } from "@testing-library/react"
import Textarea from "./Textarea"
import fireChange from "@/test-utils/fire-change"
import { TextareaProps } from "./types"

// TODO: Add a test case to check whether auto resize works properly

const mockOnChange = jest.fn()
const initialValue = "Some text"

const renderWithProps = (props?: TextareaProps) => {
  return render(
    <Textarea value={initialValue} onChange={mockOnChange} {...props} />
  )
}

describe("Test Textarea component", () => {
  test("Should receive passed value", () => {
    renderWithProps()

    const textareaEl = screen.getByRole("textbox")

    expect(textareaEl).toHaveValue(initialValue)
  })

  test("Should call passed onChange callback when user fill in textbox", () => {
    renderWithProps()

    const textareaEl = screen.getByRole("textbox")

    fireChange(textareaEl, "New value")

    expect(mockOnChange).toHaveBeenCalled()
  })

  test("Should not apply error class by default", () => {
    renderWithProps()

    const textareaContainer = screen.getByRole("textbox").parentElement

    expect(textareaContainer).not.toHaveClass("error")
  })

  test("Should apply error class when passed isError equals true", () => {
    renderWithProps({ isError: true })

    const textareaContainer = screen.getByRole("textbox").parentElement

    expect(textareaContainer).toHaveClass("error")
  })
})
