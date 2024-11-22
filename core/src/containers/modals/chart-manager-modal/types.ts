import { ChartItem } from "@/store/chart-store/types"

export interface ChartManagerModalProps {
  data: ChartItem[]
  selected: ChartItem[]
  onClose: () => void
  onAddItem: (item: ChartItem) => boolean
  onRemoveItem: (itemId: string) => void
}
