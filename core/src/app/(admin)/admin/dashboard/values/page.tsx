import { FC } from "react"
import {
  initialValueCountryOptions,
  initialValueIndicatorOptions,
  possibleValueSortDirectionQueryParam,
  possibleValueSortQueryParam,
} from "@/app/(admin)/admin/dashboard/values/constants"
import { DashboardValueQueryParams } from "@/app/(admin)/admin/dashboard/values/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ValueService from "@/services/value-service/ValueService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import ValuesDashboard from "@/containers/values-dashboard/ValuesDashboard"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"
import { PageProps } from "@/types/general.types"

export { default as metadata } from "@/app/(admin)/admin/dashboard/values/metadata"

const ValuesDashboardPage: FC<
  PageProps<object, DashboardValueQueryParams>
> = async ({ searchParams }) => {
  const sort = validateQueryParam(
    searchParams.sort,
    searchParams.indicator === "all" || !searchParams.indicator
      ? possibleValueSortQueryParam.filter(
          (item) => item !== "value" && item !== "year"
        )
      : possibleValueSortQueryParam
  )

  const indicatorSelectOptions = IndicatorService.getSelectAutocomplete()
  const countrySelectOptions = CountryService.getSelectAutocomplete()

  const [allIndicators, allCountries] = await Promise.all([
    indicatorSelectOptions,
    countrySelectOptions,
  ])

  const indicator = validateQueryParam(searchParams.indicator, [
    initialValueIndicatorOptions.value,
    ...allIndicators.map(({ value }) => value),
  ])

  const country = validateQueryParam(searchParams.country, [
    initialValueCountryOptions.value,
    ...allCountries.map(({ value }) => value),
  ])

  const sortDirection = validateQueryParam(
    searchParams.sortDirection,
    possibleValueSortDirectionQueryParam
  )

  const { data } = await ValueService.getForAdmin({
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
