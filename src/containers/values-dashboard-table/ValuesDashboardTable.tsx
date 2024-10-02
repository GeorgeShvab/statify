"use client"

import { FC } from "react"
import { Value } from "@prisma/client"
import { StoreApi } from "zustand"
import Table from "@/ui/table/Table"
import ValuesDashboardTableHead from "@/containers/values-dashboard-table/components/values-dashboard-table-head/ValuesDashboardTableHead"
import ValuesDashboardTableRow from "@/containers/values-dashboard-table/components/values-dashboard-table-row/ValuesDashboardTableRow"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import { ValuesStore } from "@/store/values-store/types"

const renderHeader = () => <ValuesDashboardTableHead />

const ValuesDashboardTable: FC = () => {
  const { values } = useContextStore<StoreApi<ValuesStore>>()

  const renderRow = (item: Value) => (
    <ValuesDashboardTableRow key={item.id} value={item} />
  )

  return (
    <Table data={values} renderRow={renderRow} renderHeader={renderHeader} />
  )
}

export default ValuesDashboardTable
