"use client"

import { FC } from "react"
import IndicatorsDashboardHeader from "@/containers/indicators-dashboard-header/IndicatorsDashboardHeader"
import IndicatorsDashboardTable from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable"
import IndicatorsDashboardTools from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools"
import { IndicatorsDashboardProps } from "@/containers/indicators-dashboard/types"
import { StoreProvider } from "@/providers/store-provider/StoreProvider"
import { selectableStore } from "@/store/selectable-store/selectable-store"

const IndicatorsDashboard: FC<IndicatorsDashboardProps> = (props) => {
  const key =
    props.indicators[0].id +
    props.indicators.length +
    props.indicators[props.indicators.length - 1].id

  return (
    <StoreProvider createStore={selectableStore}>
      <IndicatorsDashboardHeader />
      <IndicatorsDashboardTools {...props} />
      <IndicatorsDashboardTable key={key} {...props} />
    </StoreProvider>
  )
}

export default IndicatorsDashboard
