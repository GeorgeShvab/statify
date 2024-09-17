import { TableProps } from "@/ui/table/Table.types"
import "@/ui/table/styles.scss"

const Table = <T,>({
  renderFooter,
  renderHeader,
  renderRow,
  data,
}: TableProps<T>) => {
  return (
    <table className="table country-table">
      <thead>{renderHeader()}</thead>
      <tbody>{data.map(renderRow)}</tbody>
      {renderFooter ? <tfoot>{renderFooter()}</tfoot> : null}
    </table>
  )
}

export default Table
