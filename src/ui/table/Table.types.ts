export interface TableProps<T> {
  renderRow: (data: T) => JSX.Element
  renderHeader: () => JSX.Element
  renderFooter?: () => JSX.Element
  data: T[]
}
