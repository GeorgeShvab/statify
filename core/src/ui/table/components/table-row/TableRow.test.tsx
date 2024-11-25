import { render, screen } from "@testing-library/react"
import TableRow from "@/ui/table/components/table-row/TableRow"

/**
 * @group ui-components
 */

const rowContent = "This is row"

describe("Test TableRow component", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>{rowContent}</td>
          </TableRow>
        </tbody>
      </table>
    )
  })

  test("Should render passed content", () => {
    const rowEl = screen.getByText(rowContent)

    expect(rowEl).toBeInTheDocument()
  })
})
