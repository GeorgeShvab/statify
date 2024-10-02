"use client"

import { FC } from "react"
import ValuesDashboardHeader from "@/containers/values-dashboard-header/ValuesDashboardHeader"
import ValuesDashboardTable from "@/containers/values-dashboard-table/ValuesDashboardTable"
import ValuesDashboardTools from "@/containers/values-dashboard-tools/ValuesDashboardTools"
import { ValuesDashboardProps } from "@/containers/values-dashboard/types"
import { SelectableProvider } from "@/providers/selectable-provider/SelectableProvider"
import { StoreProvider } from "@/providers/store-provider/StoreProvider"
import valuesStore from "@/store/values-store/values-store"

const ValuesDashboard: FC<ValuesDashboardProps> = ({ values, ...props }) => {
  const key =
    JSON.stringify(values) +
    props.sort +
    props.indicator +
    props.country +
    props.sortDirection // I use it to reinitialize indicators store.

  return (
    <SelectableProvider>
      <StoreProvider key={key} createStore={valuesStore(values)}>
        <ValuesDashboardHeader />
        <ValuesDashboardTools {...props} />
        <ValuesDashboardTable />
      </StoreProvider>
    </SelectableProvider>
  )
}

export default ValuesDashboard
