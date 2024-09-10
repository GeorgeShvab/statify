export interface TableProps<T> {
  renderRow: (data: T) => JSX.Element
  renderHeader: () => JSX.Element
  renderFooter?: () => JSX.Element
  data: T[]
}

const Table = <T,>({
  renderFooter,
  renderHeader,
  renderRow,
  data
}: TableProps<T>) => {
  return (
    <table className='table-auto w-full relative country-table'>
      <thead>{renderHeader()}</thead>
      <tbody>{data.map(renderRow)}</tbody>
      {renderFooter ? <tfoot>{renderFooter()}</tfoot> : null}
    </table>
  )
}

export default Table
