"use client"

import { FC } from "react"
import IndicatorsDashboardHeader from "@/containers/indicators-dashboard-header/IndicatorsDashboardHeader"
import IndicatorsDashboardTable from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable"
import IndicatorsDashboardTools from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools"
import { IndicatorsDashboardProps } from "@/containers/indicators-dashboard/types"
import { SelectableProvider } from "@/providers/selectable-provider/SelectableProvider"
import { StoreProvider } from "@/providers/store-provider/StoreProvider"
import indicatorsStore from "@/store/indicators-store/indicators-store"

const IndicatorsDashboard: FC<IndicatorsDashboardProps> = (props) => {
  const key =
    JSON.stringify(props.indicators) +
    props.sort +
    props.search +
    props.sortDirection // I use it to reinitialize indicators store.

  return (
    <SelectableProvider>
      <StoreProvider key={key} createStore={indicatorsStore(props.indicators)}>
        <IndicatorsDashboardHeader />
        <IndicatorsDashboardTools {...props} />
        <IndicatorsDashboardTable />
      </StoreProvider>
    </SelectableProvider>
  )
}

export default IndicatorsDashboard
