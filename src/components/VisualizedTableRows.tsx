import { AutoSizer, List, ListProps, WindowScroller } from 'react-virtualized'

type PartialVisualizedTableRowsProps = Partial<
  Omit<ListProps, 'rowCount' | 'rowHeight' | 'rowRenderer'>
>

type RequiredVisualizedTableRowsProps = Required<
  Pick<ListProps, 'rowCount' | 'rowHeight'>
>

interface VisualizedTableRowsProps
  extends PartialVisualizedTableRowsProps,
    RequiredVisualizedTableRowsProps {
  children: ListProps['rowRenderer']
}

const VisualizedTableRows = ({
  children,
  ...props
}: VisualizedTableRowsProps) => {
  return (
    <WindowScroller>
      {(windowScrollerRenderFnProps) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              {...windowScrollerRenderFnProps}
              {...props}
              width={width}
              rowRenderer={children}
              autoHeight
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  )
}

export default VisualizedTableRows
