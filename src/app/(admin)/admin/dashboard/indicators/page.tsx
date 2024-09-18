import "@/app/(admin)/admin/dashboard/indicators/styles.scss"
import IndicatorsDashboardTools from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools"
import IndicatorsDashboardHeader from "@/containers/indicators-dashboard-header/IndicatorsDashboardHeader"
import IndicatorsDashboardTable from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { FC } from "react"
import { PageProps } from "@/types/types"
import { GetAdminIndicatorsParams } from "@/services/indicator-service/types"
import { DashboardIndicatorQueryParams } from "./types"
import validateQueryParam from "@/utils/validate-query-param/validate-query-param"
import {
  possibleIndicatorSortDirection,
  possibleIndicatorSortQueryParam,
  possibleIndicatorStatusQueryParam,
  possibleIndicatorTypeQueryParam,
} from "./constants"
export { default as metadata } from "@/app/(admin)/admin/dashboard/indicators/metadata"

const IndicatorsDashboardPage: FC<
  PageProps<{}, DashboardIndicatorQueryParams>
> = async ({ searchParams }) => {
  const sort = validateQueryParam(
    searchParams.sort,
    possibleIndicatorSortQueryParam
  )
  const status = validateQueryParam(
    searchParams.status,
    possibleIndicatorStatusQueryParam
  )
  const type = validateQueryParam(
    searchParams.type,
    possibleIndicatorTypeQueryParam
  )
  const sortDirection = validateQueryParam(
    searchParams.sortDirection,
    possibleIndicatorSortDirection
  )

  const search = searchParams.search || ""

  const indicators = await IndicatorService.getAdminIndicators({
    sort,
    search,
    sortDirection,
    hidden: status === "all" ? undefined : status === "hidden",
    absolute: type === "all" ? undefined : type === "absolute",
  })

  const key =
    indicators[0].id + indicators.length + indicators[indicators.length - 1].id

  return (
    <main className="container">
      <div className="admin-dashboard">
        <IndicatorsDashboardHeader />
        <IndicatorsDashboardTools
          sort={sort}
          type={type}
          status={status}
          search={search}
          sortDirection={sortDirection}
        />
        <IndicatorsDashboardTable key={key} indicators={indicators} />
      </div>
    </main>
  )
}

export default IndicatorsDashboardPage
