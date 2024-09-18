export interface TableProps<T> {
  renderRow: (data: T, index: number) => JSX.Element
  renderHeader: () => JSX.Element
  renderFooter?: () => JSX.Element
  data: T[]
}
