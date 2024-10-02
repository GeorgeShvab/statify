import { FC } from "react"
import {
  possibleValueCountryQueryParam,
  possibleValueIndicatorQueryParam,
  possibleValueSortDirectionQueryParam,
  possibleValueSortQueryParam,
} from "@/app/(admin)/admin/dashboard/values/constants"
import { DashboardValueQueryParams } from "@/app/(admin)/admin/dashboard/values/types"
import ValueService from "@/services/value-service/ValueService"
import ValuesDashboard from "@/containers/values-dashboard/ValuesDashboard"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"
import { PageProps } from "@/types/types"
import "@/app/(admin)/admin/dashboard/values/styles.scss"

export { default as metadata } from "@/app/(admin)/admin/dashboard/values/metadata"

const ValuesDashboardPage: FC<
  PageProps<object, DashboardValueQueryParams>
> = async ({ searchParams }) => {
  const sort = validateQueryParam(
    searchParams.sort,
    possibleValueSortQueryParam
  )

  const indicator = validateQueryParam(
    searchParams.indicator,
    possibleValueIndicatorQueryParam
  )

  const country = validateQueryParam(
    searchParams.country,
    possibleValueCountryQueryParam
  )

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
      <div className="admin-dashboard">
        <ValuesDashboard
          sort={sort}
          sortDirection={sortDirection}
          country={country}
          indicator={indicator}
          values={data}
        />
      </div>
    </main>
  )
}

export default ValuesDashboardPage
