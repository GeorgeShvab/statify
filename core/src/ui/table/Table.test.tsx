import { render, screen } from "@testing-library/react"
import Table from "@/ui/table/Table"
import { TableProps } from "@/ui/table/Table.types"

interface TableData {
  text: string
}

const headerContent = "This is Header"
const footerContent = "This is Footer"

const renderHeader = () => (
  <tr>
    <th>{headerContent}</th>
  </tr>
)
const renderFooter = () => (
  <tr>
    <td>{footerContent}</td>
  </tr>
)
const renderRow = ({ text }: TableData) => (
  <tr key={text}>
    <td>{text}</td>
  </tr>
)

const data = Array.from({ length: 50 }, (_, index) => ({
  text: "Row " + index,
}))

const renderWithProps = (props?: Partial<TableProps<TableData>>) => {
  return render(
    <Table
      data={data}
      renderHeader={renderHeader}
      renderRow={renderRow}
      {...props}
    />
  )
}

describe("Test Table component", () => {
  test("Should render header passed through render prop", () => {
    renderWithProps()

    const headerEl = screen.getByText(headerContent)
    expect(headerEl).toBeInTheDocument()
  })

  test("Should render footer passed through render prop", () => {
    renderWithProps({ renderFooter })

    const footerEl = screen.getByText(footerContent)
    expect(footerEl).toBeInTheDocument()
  })

  test("Should not render footer if render prop is not passed", () => {
    renderWithProps()

    const footerEl = screen.queryByText(footerContent)
    expect(footerEl).not.toBeInTheDocument()
  })

  test("Should render 50 rows", () => {
    renderWithProps()

    const rows = screen.getAllByText(/Row \d+/)
    expect(rows).toHaveLength(50)
  })
})
