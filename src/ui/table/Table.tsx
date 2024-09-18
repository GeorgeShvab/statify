import { TableProps } from "@/ui/table/Table.types"
import "@/ui/table/styles.scss"

const Table = <T,>({
  renderFooter,
  renderHeader,
  renderRow,
  data,
}: TableProps<T>) => {
  return (
    <div className="table__container light">
      <table className="table">
        <thead>{renderHeader()}</thead>
        <tbody>{data.map(renderRow)}</tbody>
        {renderFooter ? <tfoot>{renderFooter()}</tfoot> : null}
      </table>
    </div>
  )
}

export default Table
