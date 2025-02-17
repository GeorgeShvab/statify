import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Select from "@/ui/select/Select"
import { Option, SelectProps } from "@/ui/select/Select.types"

/**
 * @group ui-components
 */

const containerClassName = "container-class"

const mockOnChange = jest.fn()

const testOptions: Option[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "selected",
    label: "Selected",
  },
]

const mockRenderItemLabel = jest.fn()
const mockRenderSelectedLabel = jest.fn()

const openOptions = () => {
  const initialOption = screen.getByText("All")
  fireEvent.click(initialOption)
}

const renderItemLabel = (option: Option) => {
  mockRenderItemLabel()
  return option.label
}

const renderSelectedLabel = (option: Option) => {
  mockRenderSelectedLabel()
  return option.label
}

const renderWithProps = (props?: Partial<SelectProps>) => {
  return render(
    <Select
      options={testOptions}
      value={testOptions[0].value}
      onChange={mockOnChange}
      i18n={false}
      {...props}
    />
  )
}

describe("Test Select component", () => {
  test("Should display only initial option initially", () => {
    renderWithProps()

    const initialOption = screen.getByText("All")
    expect(initialOption).toBeInTheDocument()

    const hiddenOption = screen.queryByText("Selected")
    expect(hiddenOption).not.toBeInTheDocument()
  })

  test("Should open options after select is clicked", async () => {
    renderWithProps()
    openOptions()

    const appearedOption = await screen.findByText("Selected")
    expect(appearedOption).toBeInTheDocument()
  })

  test("Should select new option and close options list", async () => {
    renderWithProps()
    openOptions()

    const newOption = await screen.findByText("Selected")
    fireEvent.click(newOption)

    expect(mockOnChange).toHaveBeenCalledWith(testOptions[1])
  })

  test("Should close options when user clicks outside", async () => {
    const { container } = renderWithProps()
    openOptions()

    const optionFromList = await screen.findByText("Selected")
    expect(optionFromList).toBeInTheDocument()

    fireEvent.click(container)

    const hiddenOptionFromList = screen.queryByText("Selected")

    expect(hiddenOptionFromList)
  })

  test("Should apply passed renderSelectedLabel and renderItemLabel", () => {
    renderWithProps({
      renderItemLabel,
      renderSelectedLabel,
    })

    expect(mockRenderItemLabel).toHaveBeenCalled()
    expect(mockRenderSelectedLabel).toHaveBeenCalled()
  })

  test("Should apply passed throught containerProps class", () => {
    const { container } = renderWithProps({
      containerProps: { className: containerClassName },
    })

    openOptions()

    waitFor(() => {
      const containerEl = container.querySelector(`.${containerClassName}`)
      expect(containerEl).toBeInTheDocument()
    })
  })
})
