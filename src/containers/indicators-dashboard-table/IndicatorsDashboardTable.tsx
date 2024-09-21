"use client"

import { FC } from "react"
import { Indicator } from "@prisma/client"
import Table from "@/ui/table/Table"
import { IndicatorsDashboardTableProps } from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable.types"
import IndicatorsDashboardTableHead from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-head/IndicatorsDashboardTableHead"
import IndicatorsDashboardTableRow from "@/containers/indicators-dashboard-table/components/indicators-dashboard-table-row/IndicatorsDashboardTableRow"
import "@/containers/indicators-dashboard-table/styles.scss"

const renderHeader = () => <IndicatorsDashboardTableHead />

const IndicatorsDashboardTable: FC<IndicatorsDashboardTableProps> = ({
  indicators,
}) => {
  const renderRow = (item: Indicator & { datapoints: number }) => (
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
