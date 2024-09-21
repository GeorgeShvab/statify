import { render, screen } from "@testing-library/react"
import Button from "./Button"
import { ButtonProps } from "./Button.types"

// TODO: Add cases to test whether appropriate styles are applied with dark, light and other design-system classes

const buttonContent = "Some Content"
const testHref = "statify.com"

const renderWithProps = (props?: Partial<ButtonProps>) => {
  return render(<Button {...props}>{buttonContent}</Button>)
}

describe("Test button component", () => {
  test("Should render children", () => {
    renderWithProps()

    const buttonEl = screen.getByText(buttonContent)

    expect(buttonEl).toBeInTheDocument()
  })

  test("Should render button if no href is passed", () => {
    renderWithProps()

    const buttonEl = screen.getByRole("button")

    expect(buttonEl).toBeInTheDocument()
  })

  test("Should render anchor with right href if href is passed", () => {
    renderWithProps({ href: testHref })

    const acnhorEl = screen.getByRole("link")

    expect(acnhorEl).toBeInTheDocument()
    expect(acnhorEl).toHaveAttribute("href", testHref)
  })
})
