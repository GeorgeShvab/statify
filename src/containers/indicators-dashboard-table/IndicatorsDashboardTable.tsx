"use client"

import "@/containers/indicators-dashboard-table/styles.scss"
import Table from "@/ui/table/Table"
import { Indicator } from "@prisma/client"
import { FC } from "react"
import { IndicatorsDashboardTableProps } from "./IndicatorsDashboardTable.types"
import IndicatorsDashboardTableRow from "./components/indicators-dashboard-table-row/IndicatorsDashboardTableRow"
import IndicatorsDashboardTableHead from "./components/indicators-dashboard-table-head/IndicatorsDashboardTableHead"

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
