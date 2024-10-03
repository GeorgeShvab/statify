import { FC } from "react"
import {
  possibleCountrySortDirectionQueryParams,
  possibleCountrySortQueryParams,
  possibleCountryStatusQueryParams,
  possibleCountryTypeQueryParams,
} from "@/app/(admin)/admin/dashboard/countries/constants"
import { DashboardCountryQueryParams } from "@/app/(admin)/admin/dashboard/countries/types"
import CountryService from "@/services/country-service/CountryService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import CountriesDashboard from "@/containers/countries-dashboard/CountriesDashboard"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"
import { PageProps } from "@/types/types"
import "@/app/(admin)/admin/dashboard/countries/styles.scss"

export { default as metadata } from "@/app/(admin)/admin/dashboard/countries/metadata"

const CountriesDashboardPage: FC<
  PageProps<object, DashboardCountryQueryParams>
> = async ({ searchParams }) => {
  const sort = validateQueryParam(
    searchParams.sort,
    possibleCountrySortQueryParams
  )

  const type = validateQueryParam(
    searchParams.type,
    possibleCountryTypeQueryParams
  )

  const status = validateQueryParam(
    searchParams.status,
    possibleCountryStatusQueryParams
  )

  const sortDirection = validateQueryParam(
    searchParams.sortDirection,
    possibleCountrySortDirectionQueryParams
  )

  const search = searchParams.search || ""

  const countries = await CountryService.getAdminCountries({
    search,
    sort,
    sortDirection,
    hidden: status === "all" ? undefined : status === "hidden",
    type: type === "all" ? undefined : type,
  })

  return (
    <main className="container">
      <AdminDashboard>
        <CountriesDashboard
          countries={countries}
          search={search}
          sort={sort}
          type={type}
          sortDirection={sortDirection}
          status={status}
        />
      </AdminDashboard>
    </main>
  )
}

export default CountriesDashboardPage
