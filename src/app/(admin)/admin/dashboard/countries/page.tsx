import { FC } from "react"
import {
  possibleCountrySortDirectionQueryParams,
  possibleCountrySortQueryParams,
  possibleCountryStatusQueryParams,
  possibleCountryTypeQueryParams,
} from "@/app/(admin)/admin/dashboard/countries/constants"
import { DashboardCountryQueryParams } from "@/app/(admin)/admin/dashboard/countries/types"
import CountryService from "@/services/country-service/CountryService"
import CountriesDashboard from "@/containers/countries-dashboard/CountriesDashboard"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"
import "@/app/(admin)/admin/dashboard/countries/styles.scss"
import { PageProps } from "@/types/types"

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

  const typeCondition =
    type === "other"
      ? { isCountry: false, isUnion: false, isRegion: false }
      : {
          isCountry: type ? type === "country" : undefined,
          isUnion: type ? type === "union" : undefined,
          isRegion: type ? type === "region" : undefined,
        }

  const countries = await CountryService.getAdminCountries({
    search,
    sort,
    sortDirection,
    hidden: status === "all" ? undefined : status === "hidden",
    ...typeCondition,
  })

  return (
    <main className="container">
      <div className="admin-dashboard">
        <CountriesDashboard
          countries={countries}
          search={search}
          sort={sort}
          type={type}
          sortDirection={sortDirection}
          status={status}
        />
      </div>
    </main>
  )
}

export default CountriesDashboardPage
