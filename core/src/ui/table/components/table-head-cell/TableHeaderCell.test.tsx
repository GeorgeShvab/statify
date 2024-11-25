import { render, screen } from "@testing-library/react"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"

/**
 * @group ui-components
 */

const headCellContent = "This is head table cell"

describe("Test TableHeadCell component", () => {
  beforeEach(() => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeadCell>{headCellContent}</TableHeadCell>
          </tr>
        </thead>
      </table>
    )
  })

  test("Should render passed content", () => {
    const cellEl = screen.getByText(headCellContent)
    expect(cellEl).toBeInTheDocument()
  })
})
