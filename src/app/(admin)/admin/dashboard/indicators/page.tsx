import { FC } from "react"
import {
  possibleIndicatorSortDirection,
  possibleIndicatorSortQueryParam,
  possibleIndicatorStatusQueryParam,
  possibleIndicatorTypeQueryParam,
} from "@/app/(admin)/admin/dashboard/indicators/constants"
import { DashboardIndicatorQueryParams } from "@/app/(admin)/admin/dashboard/indicators/types"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import IndicatorsDashboard from "@/containers/indicators-dashboard/IndicatorsDashboard"
import validateQueryParam from "@/utils/validate-query-param/validate-query-param"
import "@/app/(admin)/admin/dashboard/indicators/styles.scss"
import { PageProps } from "@/types/types"

export { default as metadata } from "@/app/(admin)/admin/dashboard/indicators/metadata"

const IndicatorsDashboardPage: FC<
  PageProps<object, DashboardIndicatorQueryParams>
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
        <IndicatorsDashboard
          sort={sort}
          type={type}
          status={status}
          search={search}
          sortDirection={sortDirection}
          indicators={indicators}
        />
      </div>
    </main>
  )
}

export default IndicatorsDashboardPage
