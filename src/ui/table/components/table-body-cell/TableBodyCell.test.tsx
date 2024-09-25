import { render, screen } from "@testing-library/react"
import TableBodyCell from "./TableBodyCell"

const cellContent = "This is body table cell"

describe("Test TableBodyCell component", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <TableBodyCell>{cellContent}</TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
  })

  test("Should render passed content", () => {
    const cellEl = screen.getByText(cellContent)
    expect(cellEl).toBeInTheDocument()
  })
})
