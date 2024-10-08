import { AutoSizer, List, WindowScroller } from "react-virtualized"
import "react-virtualized/styles.css"
import Table from "@/ui/table/Table"
import { VirtualizedTableProps } from "@/components/virtualized-table/types"
import "@/components/virtualized-table/styles.scss"
import "@/ui/table/styles.scss"

const VirtualizedTable = <TData,>({
  renderHeader,
  renderFooter,
  renderRow,
  data,
  ...props
}: VirtualizedTableProps<TData>) => {
  return (
    <div className="virtualized-table">
      <Table
        semantic={false}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      >
        <WindowScroller>
          {(windowScrollerRenderFnProps) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  {...windowScrollerRenderFnProps}
                  {...props}
                  width={width}
                  rowRenderer={({ style, index }) =>
                    renderRow({ data: data[index], style })
                  }
                  autoHeight
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </Table>
    </div>
  )
}

export default VirtualizedTable
