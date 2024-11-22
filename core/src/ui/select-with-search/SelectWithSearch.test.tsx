import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import SelectWithSearch from "@/ui/select-with-search/SelectWithSearch"
import { SelectWithSearchProps } from "@/ui/select-with-search/SelectWithSearch.types"
import { Option } from "@/ui/select/Select.types"
import fireChange from "@/test-utils/fire-change"

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

const renderItemLabel = (option: Option) => {
  mockRenderItemLabel()
  return option.label
}

const renderSelectedLabel = (option: Option) => {
  mockRenderSelectedLabel()
  return option.label
}

const renderWithProps = (props?: Partial<SelectWithSearchProps>) => {
  return render(
    <SelectWithSearch
      options={testOptions}
      value={testOptions[0].value}
      onChange={mockOnChange}
      {...props}
    />
  )
}

const openOptions = () => {
  const initialOption = screen.getByText("All")
  fireEvent.click(initialOption)
}

describe("Test Select component", () => {
  test("Should display input when options are opened", async () => {
    renderWithProps()
    openOptions()

    const inputEl = await screen.findByRole("textbox")
    expect(inputEl).toBeInTheDocument()
  })

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

  test("Should display filtered by search options", () => {
    renderWithProps()
    openOptions()

    const optionsBeforeSearch = screen.getAllByRole("option")

    expect(optionsBeforeSearch).toHaveLength(2)

    const inputEl = screen.getByRole("textbox")

    fireChange(inputEl, "Sele")

    const optionsAfterSearch = screen.getAllByRole("option")

    expect(optionsAfterSearch).toHaveLength(1)
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
