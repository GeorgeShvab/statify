import { FC } from "react"
import {
  initialValueCountryOptions,
  initialValueIndicatorOptions,
  possibleValueSortDirectionQueryParam,
  possibleValueSortQueryParam,
} from "@/app/(admin)/admin/dashboard/values/constants"
import { DashboardValueQueryParams } from "@/app/(admin)/admin/dashboard/values/types"
import ValueService from "@/services/value-service/ValueService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import ValuesDashboard from "@/containers/values-dashboard/ValuesDashboard"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"
import { PageProps } from "@/types/types"

export { default as metadata } from "@/app/(admin)/admin/dashboard/values/metadata"

const ValuesDashboardPage: FC<
  PageProps<object, DashboardValueQueryParams>
> = async ({ searchParams }) => {
  const sort = validateQueryParam(
    searchParams.sort,
    possibleValueSortQueryParam
  )

  const indicator = searchParams.indicator || initialValueIndicatorOptions.value

  const country = searchParams.country || initialValueCountryOptions.value

  const sortDirection = validateQueryParam(
    searchParams.sortDirection,
    possibleValueSortDirectionQueryParam
  )

  const data = await ValueService.getAdminValues({
    sort,
    sortDirection,
    country: country === "all" ? undefined : country,
    indicator: indicator === "all" ? undefined : indicator,
  })

  return (
    <main className="container">
      <AdminDashboard>
        <ValuesDashboard
          sort={sort}
          sortDirection={sortDirection}
          country={country}
          indicator={indicator}
          values={data}
        />
      </AdminDashboard>
    </main>
  )
}

export default ValuesDashboardPage
