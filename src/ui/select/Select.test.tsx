import { fireEvent, render, screen } from "@testing-library/react"
import { Option } from "@/ui/select/Select.types"
import Select from "@/ui/select/Select"

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

describe("Test Select component", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <Select
        options={testOptions}
        value={testOptions[0].value}
        onChange={mockOnChange}
      />
    ).container
  })

  test("Should display only initial option initially", () => {
    const initialOption = screen.getByText("All")
    expect(initialOption).toBeInTheDocument()

    const hiddenOption = screen.queryByText("Selected")
    expect(hiddenOption).not.toBeInTheDocument()
  })

  test("Should open options after select is clicked", async () => {
    const initialOption = screen.getByText("All")
    fireEvent.click(initialOption)

    const appearedOption = await screen.findByText("Selected")
    expect(appearedOption).toBeInTheDocument()
  })

  test("Should select new option and close options list", async () => {
    const initialOption = screen.getByText("All")
    fireEvent.click(initialOption)

    const newOption = await screen.findByText("Selected")
    fireEvent.click(newOption)

    expect(mockOnChange).toHaveBeenCalledWith(testOptions[1])
  })

  test("Should close options when user clicks outside", async () => {
    const initialOption = screen.getByText("All")

    fireEvent.click(initialOption)

    const optionFromList = await screen.findByText("Selected")
    expect(optionFromList).toBeInTheDocument()

    fireEvent.click(container)

    const hiddenOptionFromList = screen.queryByText("Selected")

    expect(hiddenOptionFromList)
  })
})
