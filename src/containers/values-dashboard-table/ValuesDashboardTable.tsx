"use client"

import { CSSProperties, FC } from "react"
import { Value } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { StoreApi } from "zustand"
import ValuesDashboardTableHead from "@/containers/values-dashboard-table/components/values-dashboard-table-head/ValuesDashboardTableHead"
import ValuesDashboardTableRow from "@/containers/values-dashboard-table/components/values-dashboard-table-row/ValuesDashboardTableRow"
import VirtualizedTable from "@/components/virtualized-table/VirtualizedTable"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import useOnScrollTreshold from "@/hooks/use-on-scroll-treshold/useOnScrollTreshold"
import useQuery from "@/hooks/use-query/useQuery"
import { ValuesStore } from "@/store/values-store/types"
import { getValues } from "@/api/admin"

const renderHeader = () => <ValuesDashboardTableHead />

const ValuesDashboardTable: FC = () => {
  const { values, merge } = useContextStore<StoreApi<ValuesStore>>()

  const renderRow = ({
    data,
    style,
  }: {
    data: Value
    style: CSSProperties
  }) => <ValuesDashboardTableRow key={data.id} value={data} style={style} />

  const params = useSearchParams()

  const searchParams = {
    ...Object.fromEntries(params.entries()),
    offset: values.length,
  }

  const { refetch, isLoading } = useQuery(() => getValues(searchParams), {
    fetchOnMount: false,
    onSuccess: (data) => merge(data),
  })

  const ref = useOnScrollTreshold<HTMLDivElement>(
    () => {
      if (!isLoading) refetch()
    },
    80,
    5000
  )

  return (
    <div ref={ref}>
      <VirtualizedTable
        rowHeight={46}
        rowCount={values.length}
        data={values}
        renderRow={renderRow}
        renderHeader={renderHeader}
      />
    </div>
  )
}

export default ValuesDashboardTable
