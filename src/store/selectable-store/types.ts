export interface SelectableStore {
  selectedCount: number
  selectedItems: (string | number)[]
  select: (item: string | number) => void
}
