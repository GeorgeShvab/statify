"use client"

import IconButton from "@/ui/icon-button/IconButton"
import "@/containers/indicators-dashboard-table/styles.scss"
import Table from "@/ui/table/Table"
import TableRow from "@/ui/table/components/table-row/TableRow"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import { Indicator } from "@prisma/client"
import { FC } from "react"
import {
  IndicatorsDashboardTableFormValues,
  IndicatorsDashboardTableProps,
} from "./IndicatorsDashboardTable.types"
import SquareIcon from "@/ui/icons/SquareIcon"
import IndicatorsDashboardTableRow from "./components/indicators-dashboard-table-row/IndicatorsDashboardTableRow"
import IndicatorsDashboardTableHead from "./components/indicators-dashboard-table-head/IndicatorsDashboardTableHead"
import { useForm } from "react-hook-form"
import getInitialValues from "./utils/get-initial-values/getInitialValues"

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
