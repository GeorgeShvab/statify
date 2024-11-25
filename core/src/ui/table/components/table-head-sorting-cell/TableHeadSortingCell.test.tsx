import { fireEvent, render, screen } from "@testing-library/react"
import TableHeadCellWithSorting from "@/ui/table/components/table-head-sorting-cell/TableHeadSortingCell"
import { TableHeadSortingCellProps } from "@/ui/table/components/table-head-sorting-cell/TableHeadSortingCell.types"

/**
 * @group ui-components
 */

const cellContent = "This is head sorting cell"

const mockOnSortChange = jest.fn()

const buttonClassName = "some-button-class"

const renderWithProps = (props?: Partial<TableHeadSortingCellProps>) => {
  return render(
    <table>
      <thead>
        <tr>
          <TableHeadCellWithSorting
            onSortChange={mockOnSortChange}
            direction="asc"
            isSelected
            {...props}
          >
            {cellContent}
          </TableHeadCellWithSorting>
        </tr>
      </thead>
    </table>
  )
}

describe("Test TableHeadSortingCell", () => {
  test("Should render passed heading", () => {
    renderWithProps()

    const cellEl = screen.getByText(cellContent)
    expect(cellEl).toBeInTheDocument()
  })

  test("Should call passed onSortChange fn when the button is clicked", () => {
    renderWithProps()

    const cellEl = screen.getByText(cellContent)

    fireEvent.click(cellEl)

    expect(mockOnSortChange).toHaveBeenCalled()
  })

  test("Should apply passed through buttonProps className", () => {
    renderWithProps({
      buttonProps: { className: buttonClassName },
    })

    const buttonEl = screen.getByRole("button")
    expect(buttonEl).toHaveClass(buttonClassName)
  })
})
