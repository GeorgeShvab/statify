import { CSSProperties, ReactNode } from "react"
import { ListProps } from "react-virtualized"
import { TableProps } from "@/ui/table/Table.types"

type RequiredVirtualizedTableProps = Required<
  Pick<ListProps, "rowCount" | "rowHeight">
>

type VirtualizedTablePropsFromTable<TData> = Required<
  Pick<TableProps<TData>, "renderHeader" | "data">
> &
  Pick<TableProps<TData>, "renderFooter">

export interface VirtualizedTableProps<TData>
  extends RequiredVirtualizedTableProps,
    VirtualizedTablePropsFromTable<TData> {
  renderRow: (arg: { data: TData; style: CSSProperties }) => ReactNode
}
