"use client"

import { CSSProperties, FC } from "react"
import { Value } from "@prisma/client"
import { StoreApi } from "zustand"
import ValuesDashboardTableHead from "@/containers/values-dashboard-table/components/values-dashboard-table-head/ValuesDashboardTableHead"
import ValuesDashboardTableRow from "@/containers/values-dashboard-table/components/values-dashboard-table-row/ValuesDashboardTableRow"
import VirtualizedTableRows from "@/components/virtualized-table/VirtualizedTable"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import { ValuesStore } from "@/store/values-store/types"

const renderHeader = () => <ValuesDashboardTableHead />

const ValuesDashboardTable: FC = () => {
  const { values } = useContextStore<StoreApi<ValuesStore>>()

  const renderRow = ({
    data,
    style,
  }: {
    data: Value
    style: CSSProperties
  }) => <ValuesDashboardTableRow key={data.id} value={data} style={style} />

  return (
    <VirtualizedTableRows
      rowHeight={46}
      rowCount={values.length}
      data={values}
      renderRow={renderRow}
      renderHeader={renderHeader}
    />
  )
}

export default ValuesDashboardTable
