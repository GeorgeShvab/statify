import { useState } from "react"
import quickSort from "@/utils/quick-sort/quickSort"
import { SortOrder } from "@/types/general.types"
import { RowValue } from "@/types/value.types"

interface State {
  data: RowValue[]
  order: SortOrder
  by?: "year" | "value"
}

const useTableData = (data: RowValue[]) => {
  const [state, setState] = useState<State>({
    data: data,
    order: "asc",
    by: "year",
  })

  const handleSort = (by: "year" | "value") => {
    if (by === "year") {
      setState((prev) => ({
        ...prev,
        order: prev.order === "asc" && prev.by === "year" ? "desc" : "asc",
        by: "year",
        data: quickSort(
          prev.data,
          prev.order === "asc" && prev.by === "year" ? "desc" : "asc",
          (item) => item.year
        ),
      }))
    } else {
      setState((prev) => ({
        ...prev,
        order: prev.order === "asc" && prev.by === "value" ? "desc" : "asc",
        by: "value",
        data: quickSort(
          prev.data,
          prev.order === "asc" && prev.by === "value" ? "desc" : "asc",
          (item) => item.value
        ),
      }))
    }
  }

  return [state, handleSort] as const
}

export default useTableData
