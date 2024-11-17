"use client"

import { CSSProperties, FC } from "react"
import { Value } from "@prisma/client"
import { StoreApi } from "zustand"
import ValuesDashboardTableHead from "@/containers/values-dashboard-table/components/values-dashboard-table-head/ValuesDashboardTableHead"
import ValuesDashboardTableRow from "@/containers/values-dashboard-table/components/values-dashboard-table-row/ValuesDashboardTableRow"
import VirtualizedTable from "@/components/virtualized-table/VirtualizedTable"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useInfiniteScroll from "@/hooks/use-infinite-scroll/useInfiniteScroll"
import { ValuesStore } from "@/store/values-store/types"
import { getAdminValues } from "@/api/admin"

const renderHeader = () => <ValuesDashboardTableHead />

const ValuesDashboardTable: FC = () => {
  const { values, merge } = useContextStore<StoreApi<ValuesStore>>()

  const renderRow = ({
    data,
    style,
  }: {
    data: Value
    style: CSSProperties
  }) => <ValuesDashboardTableRow key={data.id} value={data} style={style} />

  const ref = useInfiniteScroll(getAdminValues, merge, { initialPage: 1 })

  return (
    <div ref={ref}>
      <VirtualizedTable
        rowHeight={46}
        rowCount={values.length}
        data={values}
        renderRow={renderRow}
        renderHeader={renderHeader}
      />
    </div>
  )
}

export default ValuesDashboardTable
