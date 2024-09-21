import { render, screen } from "@testing-library/react"
import IconButton from "./IconButton"
import { ButtonProps } from "@/ui/button/Button.types"
import AddItemIcon from "../icons/AddItemIcon"

// TODO: Add cases to test whether appropriate styles are applied with dark, light and other design-system classes

const testHref = "statify.com"
const testId = "test-icon"

const renderWithProps = (props?: Partial<ButtonProps>) => {
  return render(
    <IconButton {...props}>
      <AddItemIcon data-testid="test-icon" />
    </IconButton>
  )
}

describe("Test button component", () => {
  test("Should render children", () => {
    renderWithProps()

    const svgIcon = screen.getByTestId(testId)

    expect(svgIcon).toBeInTheDocument()
  })

  test("Should render button if no href is passed", () => {
    renderWithProps()

    const buttonIconEl = screen.getByRole("button")

    expect(buttonIconEl).toBeInTheDocument()
  })

  test("Should render anchor with right href if href is passed", () => {
    renderWithProps({ href: testHref })

    const acnhorEl = screen.getByRole("link")

    expect(acnhorEl).toBeInTheDocument()
    expect(acnhorEl).toHaveAttribute("href", testHref)
  })
})
