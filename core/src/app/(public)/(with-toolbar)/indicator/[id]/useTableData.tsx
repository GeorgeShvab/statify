import { useState } from "react"
import quickSort from "@/utils/quick-sort/quickSort"
import { CountryRowValue } from "@/types/country.types"
import { SortOrder } from "@/types/general.types"

interface State {
  data: CountryRowValue[]
  order: SortOrder
  by?: "country" | "value"
}

const useTableData = (data: CountryRowValue[]) => {
  const [state, setState] = useState<State>({
    data: data,
    order: "asc",
    by: "country",
  })

  const handleSort = (by: "country" | "value") => {
    if (by === "country") {
      setState((prev) => ({
        ...prev,
        order: prev.order === "asc" && prev.by === "country" ? "desc" : "asc",
        by: "country",
        data: quickSort(
          prev.data,
          prev.order === "asc" && prev.by === "country" ? "desc" : "asc",
          (item) => item.name
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
