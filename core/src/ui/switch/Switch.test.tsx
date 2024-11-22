import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import Switch from "@/ui/switch/Switch"
import { SwitchProps } from "@/ui/switch/Switch.types"

const labelClassName = "label-class"

const testLabelText = "Switch Me"
const mockOnChange = jest.fn()

const renderWithProps = (props?: SwitchProps) => {
  return render(
    <Switch onChange={mockOnChange} {...props}>
      {testLabelText}
    </Switch>
  )
}

describe("Test Switch component", () => {
  test("Should render passed label", () => {
    renderWithProps()

    const switchLabel = screen.getByText(testLabelText)

    expect(switchLabel).toBeInTheDocument()
  })

  test("Should not be checked by default", () => {
    const { container } = renderWithProps()

    const switchInput = container.querySelector("input")

    expect(switchInput).not.toBeChecked()
  })

  test("Should apply to input passed checked prop", () => {
    const { container } = renderWithProps({ checked: true })

    const switchInput = container.querySelector("input")

    expect(switchInput).toBeChecked()
  })

  test("Should apply passed label class", () => {
    const { container } = renderWithProps({
      labelProps: { className: labelClassName },
    })

    const labelEl = container.querySelector(`.${labelClassName}`)

    expect(labelEl).toBeInTheDocument()
  })
})
