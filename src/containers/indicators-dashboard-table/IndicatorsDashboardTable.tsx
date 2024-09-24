"use client"

import { FC } from "react"
import Table from "@/ui/table/Table"
import { IndicatorsDashboardTableProps } from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable.types"
import IndicatorsDashboardTableHead from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-head/IndicatorsDashboardTableHead"
import IndicatorsDashboardTableRow from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row/IndicatorsDashboardTableRow"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import "@/containers/indicators-dashboard-table/styles.scss"
import { IndicatorWithDatapoints } from "@/types/types"

const renderHeader = () => <IndicatorsDashboardTableHead />

const IndicatorsDashboardTable: FC<IndicatorsDashboardTableProps> = ({
  indicators,
}) => {
  const { select, selectedItems } = useContextStore()

  const renderRow = (item: IndicatorWithDatapoints) => (
    <IndicatorsDashboardTableRow
      onSelect={select}
      isSelected={selectedItems.includes(item.id)}
      key={item.id}
      indicator={item}
    />
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
