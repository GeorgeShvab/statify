import { TableProps } from "@/ui/table/Table.types"
import "@/ui/table/styles.scss"

const Table = <T,>({
  renderFooter,
  renderHeader,
  renderRow,
  data,
  children,
  semantic = true,
}: TableProps<T>) => {
  const rows = children ? children : data?.map(renderRow)

  if (semantic) {
    return (
      <div className="table__container">
        <table className="table">
          <thead>{renderHeader()}</thead>
          <tbody>{rows}</tbody>
          {renderFooter ? <tfoot>{renderFooter()}</tfoot> : null}
        </table>
      </div>
    )
  }

  return (
    <div className="table__container">
      <div className="table no-semantic">
        <div className="table__head">{renderHeader()}</div>
        <div className="table__body">{rows}</div>
        {renderFooter ? (
          <div className="table__footer">{renderFooter()}</div>
        ) : null}
      </div>
    </div>
  )
}

export default Table
