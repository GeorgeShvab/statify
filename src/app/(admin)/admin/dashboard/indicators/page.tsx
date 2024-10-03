import { FC } from "react"
import {
  possibleIndicatorSortDirection,
  possibleIndicatorSortQueryParam,
  possibleIndicatorStatusQueryParam,
} from "@/app/(admin)/admin/dashboard/indicators/constants"
import { DashboardIndicatorQueryParams } from "@/app/(admin)/admin/dashboard/indicators/types"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import IndicatorsDashboard from "@/containers/indicators-dashboard/IndicatorsDashboard"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"
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
  })

  return (
    <main className="container">
      <AdminDashboard>
        <IndicatorsDashboard
          sort={sort}
          status={status}
          search={search}
          sortDirection={sortDirection}
          indicators={indicators}
        />
      </AdminDashboard>
    </main>
  )
}

export default IndicatorsDashboardPage
