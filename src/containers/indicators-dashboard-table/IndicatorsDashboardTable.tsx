"use client"

import { FC } from "react"
import { StoreApi } from "zustand"
import Table from "@/ui/table/Table"
import IndicatorsDashboardTableHead from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-head/IndicatorsDashboardTableHead"
import IndicatorsDashboardTableRow from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row/IndicatorsDashboardTableRow"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import "@/containers/indicators-dashboard-table/styles.scss"
import { IndicatorsStore } from "@/store/indicators-store/types"
import { IndicatorWithDatapoints } from "@/types/types"

const renderHeader = () => <IndicatorsDashboardTableHead />

const IndicatorsDashboardTable: FC = () => {
  const { indicators } = useContextStore<StoreApi<IndicatorsStore>>()

  const renderRow = (item: IndicatorWithDatapoints) => (
    <IndicatorsDashboardTableRow key={item.id} indicator={item} />
  )

  return (
    <div className="indicators-dashboard-table__container">
      <Table
        data={indicators}
        renderRow={renderRow}
        renderHeader={renderHeader}
      />
    </div>
  )
}

export default IndicatorsDashboardTable
